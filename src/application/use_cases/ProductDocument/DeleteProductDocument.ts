import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IProductDocumentRepository } from "../../../core/domain/interfaces/IProductDocumentRepository";

@injectable()
export class DeleteProductDocument {
  constructor(
    @inject(TYPES.ProductDocumentRepository)
    private productDocument: IProductDocumentRepository
  ) {}

  async execute(id: string) {
    return await this.productDocument.delete(id);
  }
}
