import { CreateCategoryDto } from "../../dto/entities/Category/CreateCategoryDto";
import { FindAllCategoriesFilterDto } from "../../dto/entities/Category/FindAllCategoriesFilterDto";
import { DtoResponsePaging } from "../../dto/paging/DtoResponsePaging";
import { PagingDto } from "../../dto/paging/PagingDto";
import { Category, CategoryAttributes } from "../models/Category";

export interface ICategoryRepository {
  findById(id: string): Promise<Category | null>;
  findAll(
    filterDto: FindAllCategoriesFilterDto,
    pagingDto: PagingDto
  ): Promise<DtoResponsePaging<CategoryAttributes>>;
  create(category: CreateCategoryDto): Promise<Category>;
  delete(id: string): Promise<void>;
  update(id: string, CategoryAttributes: CategoryAttributes): Promise<Category>;
}
