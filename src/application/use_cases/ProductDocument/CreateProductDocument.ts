import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IProductDocumentRepository } from "../../../core/domain/interfaces/IProductDocumentRepository";
import { ProductDocumentCreationAttributes } from "../../../core/domain/models/ProductDocument";

@injectable()
export class CreateProductDocument {
  constructor(
    @inject(TYPES.ProductDocumentRepository)
    private productDocument: IProductDocumentRepository
  ) {}

  async execute(data: ProductDocumentCreationAttributes) {
    return await this.productDocument.create(data);
  }
}
