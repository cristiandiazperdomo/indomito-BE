import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IProductDocumentRepository } from "../../../core/domain/interfaces/IProductDocumentRepository";

@injectable()
export class FindProductDocumentById {
  constructor(
    @inject(TYPES.ProductDocumentRepository)
    private productDocument: IProductDocumentRepository
  ) {}

  async execute(id: string) {
    const doc = await this.productDocument.findById(id);
    if (!doc) throw new Error("Documento no encontrado");
    return doc;
  }
}