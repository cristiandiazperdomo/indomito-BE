import { inject, injectable } from "inversify";
import { IUserDocumentRepository } from "../../../core/domain/interfaces/IUserDocumentRepository";
import { UserDocument } from "../../../core/domain/models/UserDocument";
import { TYPES } from "../../../config/types/types";

@injectable()
export class DeleteUserDocument {
  constructor(
    @inject(TYPES.UserDocumentRepository)
    private userDocumentRepository: IUserDocumentRepository
  ) {}

  async execute(id: string): Promise<UserDocument> {
    return await this.userDocumentRepository.delete(id);
  }
}
