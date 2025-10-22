import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IProductRepository } from "../../../core/domain/interfaces/IProductRepository";
import { CreateProductDto } from "../../../core/dto/entities/Product/CreateProductDto";
import { InvalidDataException } from "../../../core/exceptions/InvalidDataException";

@injectable()
export class UpdateProduct {
  constructor(
    @inject(TYPES.ProductRepository)
    private productRepository: IProductRepository
  ) {}

  async execute(id: string, productDto: CreateProductDto) {
    if (!productDto)
      throw new InvalidDataException("productDto is missing");
    await productDto.dtoValidate();
    return this.productRepository.update(id, productDto);
  }
}
