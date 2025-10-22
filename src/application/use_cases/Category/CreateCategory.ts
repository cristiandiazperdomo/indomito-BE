import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { ICategoryRepository } from "../../../core/domain/interfaces/ICategoryRepository";
import { CreateCategoryDto } from "../../../core/dto/entities/Category/CreateCategoryDto";

@injectable()
export class CreateCategory {
  constructor(
    @inject(TYPES.CategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(categoryDto: CreateCategoryDto) {
    await categoryDto.dtoValidate();
    return await this.categoryRepository.create(categoryDto);
  }
}
