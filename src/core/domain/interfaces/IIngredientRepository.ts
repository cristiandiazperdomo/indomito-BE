import { CreateCategoryDto } from "../../dto/entities/Category/CreateCategoryDto";
import { FindAllIngredientsFilterDto } from "../../dto/entities/Ingredients/FindAllIngredientsFilterDto";
import { DtoResponsePaging } from "../../dto/paging/DtoResponsePaging";
import { PagingDto } from "../../dto/paging/PagingDto";
import { Ingredient, IngredientAttributes } from "../models/Ingredient";

export interface IIngredientRepository {
  findById(id: string): Promise<Ingredient | null>;
  findAll(
    filterDto: FindAllIngredientsFilterDto,
    pagingDto: PagingDto
  ): Promise<DtoResponsePaging<IngredientAttributes>>;
  create(data: CreateCategoryDto): Promise<Ingredient>;
  update(id: string, data: IngredientAttributes): Promise<Ingredient>;
  delete(id: string): Promise<void>;
}
