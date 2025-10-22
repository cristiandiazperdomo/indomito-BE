import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { ICategoryRepository } from "../../../core/domain/interfaces/ICategoryRepository";

@injectable()
export class FindCategoryById {
  constructor(
    @inject(TYPES.CategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(id: string) {
    return await this.categoryRepository.findById(id);
  }
}
