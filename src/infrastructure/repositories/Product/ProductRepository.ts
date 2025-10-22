import { injectable } from "inversify";
import { IProductRepository } from "../../../core/domain/interfaces/IProductRepository";
import { FindAllProductsFilterDto } from "../../../core/dto/entities/Product/FindAllProductsFilterDto";
import { PagingDto } from "../../../core/dto/paging/PagingDto";
import { DtoResponsePaging } from "../../../core/dto/paging/DtoResponsePaging";
import {
  Product,
  ProductAttributes,
} from "../../../core/domain/models/Product";
import { CreateProductDto } from "../../../core/dto/entities/Product/CreateProductDto";
import { NotFoundException } from "../../../core/exceptions/NotFoundException";
import { ElementAlreadyExistsException } from "../../../core/exceptions/ElementAlreadyExistsException";
import { Op, UniqueConstraintError } from "sequelize";
import { prepareFilterFindAll } from "./prepareFilterFindAll";
import { Category } from "../../../core/domain/models/Category";
import { Ingredient } from "../../../core/domain/models/Ingredient";

@injectable()
export class ProductRepository implements IProductRepository {
  public async findAll(
    filterDto: FindAllProductsFilterDto,
    pagingDto: PagingDto
  ): Promise<DtoResponsePaging<ProductAttributes>> {
    const dtoResponsePaging: DtoResponsePaging<ProductAttributes> =
      new DtoResponsePaging();

    const filterWithPaging = prepareFilterFindAll(filterDto, pagingDto);

    const filterWithoutPaging = { where: filterWithPaging.where };

    dtoResponsePaging.count = await Product.count(filterWithoutPaging);
    dtoResponsePaging.items = await Product.findAll(filterWithPaging);

    return dtoResponsePaging;
  }

  public async findById(id: string): Promise<Product | null> {
    const product = await Product.findByPk(id);

    if (!product) throw new NotFoundException("Product not found");

    return product;
  }

  public async create(productDto: CreateProductDto): Promise<Product> {
    const { categories, ingredients, ...productData } = productDto;

    try {
      const product = await Product.create(productData);

      await this.associateRelations(product, categories, ingredients);

      const productWithRelations = await Product.findByPk(product.id, {
        include: [
          { model: Category, as: "categories" },
          { model: Ingredient, as: "ingredients" },
        ],
      });

      if (!productWithRelations) {
        throw new Error("No se pudo cargar el producto recién creado");
      }

      return productWithRelations;
    } catch (error: any) {
      if (error instanceof UniqueConstraintError) {
        throw new ElementAlreadyExistsException("Product already exist");
      }
      throw error;
    }
  }

  private async associateRelations(
    product: Product,
    categories?: string[],
    ingredients?: string[]
  ) {
    if (categories && categories.length > 0) {
      const categoryInstances = await Category.findAll({
        where: { id: { [Op.in]: categories } },
      });
      if (categoryInstances.length !== categories.length) {
        await this.delete(product.id);
        throw new Error("Una o más categorías no existen");
      }
      await product.setCategories(categoryInstances);
    }

    if (ingredients && ingredients.length > 0) {
      const ingredientInstances = await Ingredient.findAll({
        where: { id: { [Op.in]: ingredients } },
      });
      if (ingredientInstances.length !== ingredients.length) {
        await this.delete(product.id);
        throw new Error("Uno o más ingredientes no existen");
      }
      await product.setIngredients(ingredientInstances);
    }
  }

  public async delete(id: string): Promise<void> {
    const product = await Product.findByPk(id);
    if (!product) throw new NotFoundException("Product not found");
    await product.destroy();
  }

  public async update(
    id: string,
    product: ProductAttributes
  ): Promise<Product> {
    const foundProduct = await Product.findByPk(id);
    if (!foundProduct) throw new NotFoundException("Product not found");
    foundProduct.update(product);
    return foundProduct;
  }
}
