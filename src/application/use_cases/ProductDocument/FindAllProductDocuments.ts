import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IProductDocumentRepository } from "../../../core/domain/interfaces/IProductDocumentRepository";

@injectable()
export class FindAllProductDocuments {
  constructor(
    @inject(TYPES.ProductDocumentRepository)
    private productDocument: IProductDocumentRepository
  ) {}

  async execute(productId: string) {
    return await this.productDocument.findAllByProduct(productId);
  }
}
