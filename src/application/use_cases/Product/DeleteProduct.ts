import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { ProductRepository } from "../../../infrastructure/repositories/Product/ProductRepository";

@injectable()
export class DeleteProduct {
  constructor(
    @inject(TYPES.ProductRepository) private productRepository: ProductRepository
  ) {}

  async execute(id: string) {
    return await this.productRepository.delete(id);
  }
}
