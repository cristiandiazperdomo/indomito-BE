import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../../config/types/types";
import { CreateUserDocument } from "../../../../application/use_cases/UserDocument/CreateUserDocument";
import { FindUserDocumentById } from "../../../../application/use_cases/UserDocument/FindUserDocumentById";
import { FindAllUserDocuments } from "../../../../application/use_cases/UserDocument/FindAllUserDocuments";
import { DeleteUserDocument } from "../../../../application/use_cases/UserDocument/DeleteUserDocument";
import { FindUserDocumentByUserId } from "../../../../application/use_cases/UserDocument/FindUserDocumentByUserId";
import { getHttpStatusCode } from "../../status/Error";
import { CreateUserDocumentDto } from "../../../../core/dto/entities/UserDocument/CreateUserDocumentDto";
import { upload } from "../../../../config/multer";
import { UserDocument } from "../../../../core/domain/models/UserDocument";

@injectable()
export class UserDocumentController {
  constructor(
    @inject(TYPES.CreateUserDocument)
    private createDocument: CreateUserDocument,
    @inject(TYPES.FindAllUserDocuments)
    private findAllDocuments: FindAllUserDocuments,
    @inject(TYPES.FindUserDocumentById)
    private findDocumentById: FindUserDocumentById,
    @inject(TYPES.DeleteUserDocument)
    private deleteDocument: DeleteUserDocument,
    @inject(TYPES.FindUserDocumentByUserId)
    private findDocumentByUserId: FindUserDocumentByUserId
  ) {}

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.query;
      const docs = await this.findAllDocuments.execute(userId as string);
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

      const userId = req.body.userId;

      const documentDto = new CreateUserDocumentDto({
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        userId,
      });

      const doc = await UserDocument.findOne({ where: { userId } });


      if (doc) {
        const fs = require("fs");
        if (fs.existsSync(doc.path)) fs.unlinkSync(doc.path);
        await this.deleteDocument.execute(doc.id);
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

  public async getByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const doc = await this.findDocumentByUserId.execute(userId);
      res.json(doc);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }
}
