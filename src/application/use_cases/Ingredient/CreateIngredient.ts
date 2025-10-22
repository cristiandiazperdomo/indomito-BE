import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IIngredientRepository } from "../../../core/domain/interfaces/IIngredientRepository";
import { CreateIngredientDto } from "../../../core/dto/entities/Ingredients/CreateIngredientDto";

@injectable()
export class CreateIngredient {
  constructor(
    @inject(TYPES.IngredientRepository)
    private ingredientRepository: IIngredientRepository
  ) {}

  async execute(dto: CreateIngredientDto) {
    await dto.dtoValidate();
    return await this.ingredientRepository.create(dto);
  }
}
