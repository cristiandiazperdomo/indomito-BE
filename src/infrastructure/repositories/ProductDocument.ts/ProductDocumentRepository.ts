import { injectable } from "inversify";
import { IProductDocumentRepository } from "../../../core/domain/interfaces/IProductDocumentRepository";
import {
  ProductDocument,
  ProductDocumentCreationAttributes,
} from "../../../core/domain/models/ProductDocument";

@injectable()
export class ProductDocumentRepository implements IProductDocumentRepository {
  async create(data: ProductDocumentCreationAttributes) {
    try {
      return await ProductDocument.create(data);
    } catch (error: any) {
      throw new Error(`Error creando el documento: ${error.message}`);
    }
  }

  async findAllByProduct(productId: string) {
    try {
      return await ProductDocument.findAll({ where: { productId } });
    } catch (error: any) {
      throw new Error(
        `Error obteniendo documentos del producto: ${error.message}`
      );
    }
  }

  async findById(id: string) {
    try {
      const doc = await ProductDocument.findByPk(id);
      if (!doc) throw new Error("Documento no encontrado");
      return doc;
    } catch (error: any) {
      throw new Error(`Error buscando el documento: ${error.message}`);
    }
  }

  async delete(id: string) {
    try {
      const doc = await this.findById(id);
      await doc.destroy();
      return doc;
    } catch (error: any) {
      throw new Error(`Error eliminando el documento: ${error.message}`);
    }
  }

  async findByProductId(productId: string) {
    try {
      const doc = await ProductDocument.findOne({ where: { productId } });
      if (!doc) throw new Error("Documento no encontrado para este producto");
      return doc;
    } catch (error: any) {
      throw new Error(`Error buscando el documento por productId: ${error.message}`);
    }
  }
}
