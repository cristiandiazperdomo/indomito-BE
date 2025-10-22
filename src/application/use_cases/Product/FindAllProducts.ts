import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { PagingDto } from "../../../core/dto/paging/PagingDto";
import { IProductRepository } from "../../../core/domain/interfaces/IProductRepository";
import { FindAllProductsFilterDto } from "../../../core/dto/entities/Product/FindAllProductsFilterDto";

@injectable()
export class FindAllProducts {
  constructor(
    @inject(TYPES.ProductRepository)
    private productRepository: IProductRepository
  ) {}

  async execute(filterDto: FindAllProductsFilterDto, pagingDto: PagingDto) {
    return await this.productRepository.findAll(filterDto, pagingDto);
  }
}
