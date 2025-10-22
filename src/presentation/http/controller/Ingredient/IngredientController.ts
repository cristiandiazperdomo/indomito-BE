import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../../config/types/types";
import { PagingDto } from "../../../../core/dto/paging/PagingDto";
import { getHttpStatusCode } from "../../status/Error";
import { extractFilter } from "../extractors/extractFilter";
import { extractPaging } from "../extractors/extractPaging";
import { validatePagingQueryParams } from "../../validation/validate_paging";
import { CreateIngredientDto } from "../../../../core/dto/entities/Ingredients/CreateIngredientDto";
import { UpdateIngredient } from "../../../../application/use_cases/Ingredient/UpdateIngredient";
import { FindAllIngredients } from "../../../../application/use_cases/Ingredient/FindAllIngredients";
import { FindIngredientById } from "../../../../application/use_cases/Ingredient/FindIngredientById";
import { CreateIngredient } from "../../../../application/use_cases/Ingredient/CreateIngredient";
import { DeleteIngredient } from "../../../../application/use_cases/Ingredient/DeleteIngredient";
import { FindAllIngredientsFilterDto } from "../../../../core/dto/entities/Ingredients/FindAllIngredientsFilterDto";

@injectable()
export class IngredientController {
  constructor(
    @inject(TYPES.FindAllIngredients)
    private findAllIngredients: FindAllIngredients,
    @inject(TYPES.FindIngredientById)
    private findIngredientById: FindIngredientById,
    @inject(TYPES.CreateIngredient)
    private createIngredient: CreateIngredient,
    @inject(TYPES.UpdateIngredient)
    private updateIngredient: UpdateIngredient,
    @inject(TYPES.DeleteIngredient)
    private deleteIngredient: DeleteIngredient
  ) {}

  public async getAllIngredients(req: Request, res: Response): Promise<void> {
    try {
      await validatePagingQueryParams(req);
      const filter: FindAllIngredientsFilterDto = await extractFilter(req);
      const paging: PagingDto = await extractPaging(req);

      const ingredients = await this.findAllIngredients.execute(filter, paging);
      res.json(ingredients);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }

  public async getIngredientById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).json({ message: "El ID es obligatorio" });
        return;
      }

      const ingredient = await this.findIngredientById.execute(id);
      res.json(ingredient);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const ingredientDto: CreateIngredientDto = new CreateIngredientDto(
        req.body
      );
      await ingredientDto.dtoValidate();
      const newIngredient = await this.createIngredient.execute(ingredientDto);
      res.status(201).json(newIngredient);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const ingredientDto: CreateIngredientDto = new CreateIngredientDto(
        req.body
      );
      await ingredientDto.dtoValidate();
      const updatedIngredient = await this.updateIngredient.execute(
        id,
        ingredientDto
      );
      res.json(updatedIngredient);
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
      await this.deleteIngredient.execute(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }
}
