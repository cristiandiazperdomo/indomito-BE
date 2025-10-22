import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IIngredientRepository } from "../../../core/domain/interfaces/IIngredientRepository";
import { PagingDto } from "../../../core/dto/paging/PagingDto";
import { FindAllIngredientsFilterDto } from "../../../core/dto/entities/Ingredients/FindAllIngredientsFilterDto";

@injectable()
export class FindAllIngredients {
  constructor(
    @inject(TYPES.IngredientRepository)
    private ingredientRepository: IIngredientRepository
  ) {}

  async execute(filterDto: FindAllIngredientsFilterDto, pagingDto: PagingDto) {
    return await this.ingredientRepository.findAll(filterDto, pagingDto);
  }
}
