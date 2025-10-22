import { inject, injectable } from "inversify";
import { IUserDocumentRepository } from "../../../core/domain/interfaces/IUserDocumentRepository";
import { UserDocument } from "../../../core/domain/models/UserDocument";
import { TYPES } from "../../../config/types/types";

@injectable()
export class FindUserDocumentById {
  constructor(
    @inject(TYPES.UserDocumentRepository)
    private userDocumentRepository: IUserDocumentRepository
  ) {}

  async execute(id: string): Promise<UserDocument> {
    const doc = await this.userDocumentRepository.findById(id);
    if (!doc) throw new Error("Documento no encontrado");
    return doc;
  }
}
