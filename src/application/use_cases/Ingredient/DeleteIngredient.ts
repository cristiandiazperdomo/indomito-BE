import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IIngredientRepository } from "../../../core/domain/interfaces/IIngredientRepository";

@injectable()
export class DeleteIngredient {
  constructor(
    @inject(TYPES.IngredientRepository)
    private ingredientRepository: IIngredientRepository
  ) {}

  async execute(id: string) {
    return await this.ingredientRepository.delete(id);
  }
}
