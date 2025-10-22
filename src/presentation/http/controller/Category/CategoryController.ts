import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../../config/types/types";
import { FindAllCategoriesFilterDto } from "../../../../core/dto/entities/Category/FindAllCategoriesFilterDto";
import { FindCategoryById } from "../../../../application/use_cases/Category/FindCategoryById";
import { DeleteCategory } from "../../../../application/use_cases/Category/DeleteCategory";
import { CreateCategory } from "../../../../application/use_cases/Category/CreateCategory";
import { UpdateCategory } from "../../../../application/use_cases/Category/UpdateCategory";
import { validatePagingQueryParams } from "../../validation/validate_paging";
import { extractFilter } from "../extractors/extractFilter";
import { extractPaging } from "../extractors/extractPaging";
import { FindAllCategories } from "../../../../application/use_cases/Category/FindAllCategories";
import { PagingDto } from "../../../../core/dto/paging/PagingDto";
import { getHttpStatusCode } from "../../status/Error";
import { CreateCategoryDto } from "../../../../core/dto/entities/Category/CreateCategoryDto";

@injectable()
export class CategoryController {
  constructor(
    @inject(TYPES.FindAllCategories)
    private findAllCategories: FindAllCategories,
    @inject(TYPES.FindCategoryById) private findCategoryById: FindCategoryById,
    @inject(TYPES.DeleteCategory) private deleteCategory: DeleteCategory,
    @inject(TYPES.CreateCategory) private createCategory: CreateCategory,
    @inject(TYPES.UpdateCategory) private updateCategory: UpdateCategory
  ) {}

  public async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      await validatePagingQueryParams(req);
      const filter: FindAllCategoriesFilterDto = await extractFilter(req);
      const paging: PagingDto = await extractPaging(req);

      const categories = await this.findAllCategories.execute(filter, paging);
      res.json(categories);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }

  public async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      if (!id) {
        res.status(400).json({ message: "El ID es obligatorio" });
        return;
      }

      const category = await this.findCategoryById.execute(id);
      res.json(category);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const categoryDto: CreateCategoryDto = new CreateCategoryDto(req.body);
      const newCategory = await this.createCategory.execute(categoryDto);
      res.status(204).send(newCategory);
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

      await this.deleteCategory.execute(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const categoryDto: CreateCategoryDto = new CreateCategoryDto(req.body);
      const updatedCategory = await this.updateCategory.execute(
        id,
        categoryDto
      );
      res.json(updatedCategory);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }
}
