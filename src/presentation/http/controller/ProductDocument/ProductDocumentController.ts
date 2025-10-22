import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../../config/types/types";
import { CreateProductDocument } from "../../../../application/use_cases/ProductDocument/CreateProductDocument";
import { FindProductDocumentById } from "../../../../application/use_cases/ProductDocument/FindProductDocumentById";
import { FindAllProductDocuments } from "../../../../application/use_cases/ProductDocument/FindAllProductDocuments";
import { DeleteProductDocument } from "../../../../application/use_cases/ProductDocument/DeleteProductDocument";
import { FindProductDocumentByProductId } from "../../../../application/use_cases/ProductDocument/FindProductDocumentByProductId";
import { getHttpStatusCode } from "../../status/Error";
import { CreateProductDocumentDto } from "../../../../core/dto/entities/ProductDocument/CreateProductDocument";
import { ProductDocument } from "../../../../core/domain/models/ProductDocument";

@injectable()
export class ProductDocumentController {
  constructor(
    @inject(TYPES.CreateProductDocument)
    private createDocument: CreateProductDocument,
    @inject(TYPES.FindAllProductDocuments)
    private findAllDocuments: FindAllProductDocuments,
    @inject(TYPES.FindProductDocumentById)
    private findDocumentById: FindProductDocumentById,
    @inject(TYPES.DeleteProductDocument)
    private deleteDocument: DeleteProductDocument,
    @inject(TYPES.FindProductDocumentByProductId)
    private findDocumentByProductId: FindProductDocumentByProductId
  ) {}

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.query;
      const docs = await this.findAllDocuments.execute(productId as string);
      res.json(docs);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }

  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const doc = await this.findDocumentById.execute(id);
      res.json(doc);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const file = (req as any).file;
      if (!file) {
        res.status(400).json({ message: "Archivo obligatorio" });
        return;
      }

      const productId = req.body.productId;

      const documentDto = new CreateProductDocumentDto({
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        productId,
      });

      const existingDoc = await ProductDocument.findOne({
        where: { productId },
      });
      if (existingDoc) {
        const fs = require("fs");
        if (fs.existsSync(existingDoc.path)) fs.unlinkSync(existingDoc.path);
        await this.deleteDocument.execute(existingDoc.id);
      }

      const newDoc = await this.createDocument.execute(documentDto);
      res.status(201).json(newDoc);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      await this.deleteDocument.execute(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }

  public async getByProductId(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.productId;
      const doc = await this.findDocumentByProductId.execute(productId);
      res.json(doc);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }
}
