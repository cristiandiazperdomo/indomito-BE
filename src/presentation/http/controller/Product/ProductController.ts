import { inject, injectable } from "inversify";
import { TYPES } from "../../../../config/types/types";
import { validatePagingQueryParams } from "../../validation/validate_paging";
import { extractFilter } from "../extractors/extractFilter";
import { Request, Response } from "express";
import { PagingDto } from "../../../../core/dto/paging/PagingDto";
import { extractPaging } from "../extractors/extractPaging";
import { getHttpStatusCode } from "../../status/Error";
import { CreateProductDto } from "../../../../core/dto/entities/Product/CreateProductDto";
import { FindAllProducts } from "../../../../application/use_cases/Product/FindAllProducts";
import { FindProductById } from "../../../../application/use_cases/Product/FindProductById";
import { DeleteProduct } from "../../../../application/use_cases/Product/DeleteProduct";
import { CreateProduct } from "../../../../application/use_cases/Product/CreateProduct";
import { FindAllProductsFilterDto } from "../../../../core/dto/entities/Product/FindAllProductsFilterDto";
import { UpdateProduct } from "../../../../application/use_cases/Product/UpdateProduct";

@injectable()
export class ProductController {
  constructor(
    @inject(TYPES.FindAllProducts) private findAllProducts: FindAllProducts,
    @inject(TYPES.FindProductById) private findProductById: FindProductById,
    @inject(TYPES.DeleteProduct) private deleteProduct: DeleteProduct,
    @inject(TYPES.CreateProduct) private createProduct: CreateProduct,
    @inject(TYPES.UpdateProduct) private updateProduct: UpdateProduct
  ) {}

  public async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      await validatePagingQueryParams(req);

      const filter: FindAllProductsFilterDto = await extractFilter(req);
      const paging: PagingDto = await extractPaging(req);

      const products = await this.findAllProducts.execute(filter, paging);
      res.json(products);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }

  public async getProductById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      if (!id) {
        res.status(400).json({ message: "El ID es obligatorio" });
        return;
      }

      const product = await this.findProductById.execute(id);
      res.json(product);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const productDto: CreateProductDto = new CreateProductDto(req.body);
      const newProduct = await this.createProduct.execute(productDto);
      res.status(204).send(newProduct);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      if (!id) {
        res.status(400).json({ message: "El ID es obligatorio" });
        return;
      }

      await this.deleteProduct.execute(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const productDto: CreateProductDto = new CreateProductDto(req.body);
      const updatedProduct = await this.updateProduct.execute(id, productDto);
      res.json(updatedProduct);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }
}
