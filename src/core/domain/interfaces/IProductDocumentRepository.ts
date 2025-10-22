import { ProductDocument, ProductDocumentCreationAttributes } from "../../domain/models/ProductDocument";

export interface IProductDocumentRepository {
  create(data: ProductDocumentCreationAttributes): Promise<ProductDocument>;
  findAllByProduct(productId: string): Promise<ProductDocument[]>;
  findById(id: string): Promise<ProductDocument | null>;
  delete(id: string): Promise<ProductDocument>;
  findByProductId(productId: string): Promise<ProductDocument>;
}
