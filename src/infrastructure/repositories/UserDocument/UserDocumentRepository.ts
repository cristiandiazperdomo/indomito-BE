import { injectable } from "inversify";
import { IUserDocumentRepository } from "../../../core/domain/interfaces/IUserDocumentRepository";
import {
  UserDocument,
  UserDocumentCreationAttributes,
} from "../../../core/domain/models/UserDocument";

@injectable()
export class UserDocumentRepository implements IUserDocumentRepository {
  async create(data: UserDocumentCreationAttributes) {
    try {
      return await UserDocument.create(data);
    } catch (error: any) {
      throw new Error(`Error creando el documento: ${error.message}`);
    }
  }

  async findAllByUser(userId: string) {
    try {
      return await UserDocument.findAll({ where: { userId } });
    } catch (error: any) {
      throw new Error(
        `Error obteniendo documentos del usuario: ${error.message}`
      );
    }
  }

  async findById(id: string) {
    try {
      const doc = await UserDocument.findByPk(id);
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

  async findByUserId(userId: string) {
    try {
      const doc = await UserDocument.findOne({ where: { userId } });
      if (!doc) throw new Error("Documento no encontrado para este usuario");
      return doc;
    } catch (error: any) {
      throw new Error(`Error buscando el documento por userId: ${error.message}`);
    }
  }
}
