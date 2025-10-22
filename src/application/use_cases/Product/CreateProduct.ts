import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { CreateProductDto } from "../../../core/dto/entities/Product/CreateProductDto";
import { ProductRepository } from "../../../infrastructure/repositories/Product/ProductRepository";

@injectable()
export class CreateProduct {
  constructor(
    @inject(TYPES.ProductRepository)
    private productRepository: ProductRepository
  ) {}
  async execute(productDto: CreateProductDto) {
    await productDto.dtoValidate();
    return await this.productRepository.create(productDto);
  }
}
