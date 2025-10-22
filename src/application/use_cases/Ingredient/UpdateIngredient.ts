import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IIngredientRepository } from "../../../core/domain/interfaces/IIngredientRepository";
import { CreateIngredientDto } from "../../../core/dto/entities/Ingredients/CreateIngredientDto";
import { InvalidDataException } from "../../../core/exceptions/InvalidDataException";
import { IngredientAttributes } from "../../../core/domain/models/Ingredient";

@injectable()
export class UpdateIngredient {
  constructor(
    @inject(TYPES.IngredientRepository)
    private ingredientRepository: IIngredientRepository
  ) {}

  async execute(id: string, ingredientDto: CreateIngredientDto) {
    if (!ingredientDto)
      throw new InvalidDataException("ingredientDto is missing");
    await ingredientDto.dtoValidate();
    return this.ingredientRepository.update(id, ingredientDto);
  }
}
