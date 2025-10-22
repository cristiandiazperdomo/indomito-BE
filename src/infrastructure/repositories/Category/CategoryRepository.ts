import { injectable } from "inversify";
import { ICategoryRepository } from "../../../core/domain/interfaces/ICategoryRepository";
import { FindAllCategoriesFilterDto } from "../../../core/dto/entities/Category/FindAllCategoriesFilterDto";
import { PagingDto } from "../../../core/dto/paging/PagingDto";
import { DtoResponsePaging } from "../../../core/dto/paging/DtoResponsePaging";
import {
  Category,
  CategoryAttributes,
} from "../../../core/domain/models/Category";
import { prepareFilterFindAll } from "./prepareFilterFindAll";
import { NotFoundException } from "../../../core/exceptions/NotFoundException";
import { ElementAlreadyExistsException } from "../../../core/exceptions/ElementAlreadyExistsException";
import { CreateCategoryDto } from "../../../core/dto/entities/Category/CreateCategoryDto";
import { UniqueConstraintError } from "sequelize";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  public async findAll(
    filterDto: FindAllCategoriesFilterDto,
    pagingDto: PagingDto
  ): Promise<DtoResponsePaging<CategoryAttributes>> {
    const dtoResponsePaging: DtoResponsePaging<CategoryAttributes> =
      new DtoResponsePaging();

    const filterWithPaging = prepareFilterFindAll(filterDto, pagingDto);

    const filterWithoutPaging = { where: filterWithPaging.where };

    dtoResponsePaging.count = await Category.count(filterWithoutPaging);
    dtoResponsePaging.items = await Category.findAll(filterWithPaging);

    return dtoResponsePaging;
  }

  public async findById(id: string): Promise<Category | null> {
    const category = await Category.findByPk(id);

    if (!category) throw new NotFoundException("Category not found");

    return category;
  }

  public async create(category: CreateCategoryDto): Promise<Category> {
    try {
      return await Category.create(category);
    } catch (error: any) {
      if (error instanceof UniqueConstraintError) {
        throw new ElementAlreadyExistsException("Category already exist");
      }
      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    const category = await Category.findByPk(id);
    if (!category) throw new NotFoundException("Category not found");
    await category.destroy();
  }

  public async update(
    id: string,
    category: CategoryAttributes
  ): Promise<Category> {
    const foundCategory = await Category.findByPk(id);
    if (!foundCategory) throw new NotFoundException("Category not found");
    foundCategory.update(category);
    return foundCategory;
  }
}
