import { DtoResponsePaging } from "../../dto/paging/DtoResponsePaging";
import { PagingDto } from "../../dto/paging/PagingDto";
import { CreateProductDto } from "../../dto/entities/Product/CreateProductDto";
import { FindAllProductsFilterDto } from "../../dto/entities/Product/FindAllProductsFilterDto";
import { Product, ProductAttributes } from "../models/Product";

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findAll(
    filterDto: FindAllProductsFilterDto,
    pagingDto: PagingDto
  ): Promise<DtoResponsePaging<ProductAttributes>>;
  create(product: CreateProductDto): Promise<Product>;
  delete(id: string): Promise<void>;
  update(id: string, ProductAttributes: ProductAttributes): Promise<Product>;
}
