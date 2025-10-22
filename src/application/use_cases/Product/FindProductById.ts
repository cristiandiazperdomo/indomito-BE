import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IProductRepository } from "../../../core/domain/interfaces/IProductRepository";

@injectable()
export class FindProductById {
  constructor(
    @inject(TYPES.ProductRepository) private productRepository: IProductRepository
  ) {}

  async execute(id: string) {
    return await this.productRepository.findById(id);
  }
}
