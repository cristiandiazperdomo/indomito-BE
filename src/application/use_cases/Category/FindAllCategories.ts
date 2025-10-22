import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { ICategoryRepository } from "../../../core/domain/interfaces/ICategoryRepository";
import { FindAllCategoriesFilterDto } from "../../../core/dto/entities/Category/FindAllCategoriesFilterDto";
import { PagingDto } from "../../../core/dto/paging/PagingDto";

@injectable()
export class FindAllCategories {
  constructor(
    @inject(TYPES.CategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(filterDto: FindAllCategoriesFilterDto, pagingDto: PagingDto) {
    return await this.categoryRepository.findAll(filterDto, pagingDto);
  }
}
