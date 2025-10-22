import { inject, injectable } from "inversify";
import { IProductDocumentRepository } from "../../../core/domain/interfaces/IProductDocumentRepository";
import { ProductDocument } from "../../../core/domain/models/ProductDocument";
import { TYPES } from "../../../config/types/types";

@injectable()
export class FindProductDocumentByProductId {
  constructor(
    @inject(TYPES.ProductDocumentRepository)
    private productDocumentRepository: IProductDocumentRepository
  ) {}

  async execute(productId: string): Promise<ProductDocument> {
    return await this.productDocumentRepository.findByProductId(productId);
  }
}
