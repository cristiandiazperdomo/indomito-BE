import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { InvalidDataException } from "../../../core/exceptions/InvalidDataException";
import { ICategoryRepository } from "../../../core/domain/interfaces/ICategoryRepository";
import { CreateCategoryDto } from "../../../core/dto/entities/Category/CreateCategoryDto";

@injectable()
export class UpdateCategory {
  constructor(
    @inject(TYPES.CategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(id: string, categoryDto: CreateCategoryDto) {
    if (!categoryDto) throw new InvalidDataException("createCategoryDto is missing");
    await categoryDto.dtoValidate();
    return this.categoryRepository.update(id, categoryDto);
  }
}
