import { inject, injectable } from "inversify";
import { IUserDocumentRepository } from "../../../core/domain/interfaces/IUserDocumentRepository";
import { UserDocument } from "../../../core/domain/models/UserDocument";
import { TYPES } from "../../../config/types/types";

@injectable()
export class FindAllUserDocuments {
  constructor(
    @inject(TYPES.UserDocumentRepository)
    private userDocumentRepository: IUserDocumentRepository
  ) {}

  async execute(userId?: string): Promise<UserDocument[]> {
    if (userId) {
      return await this.userDocumentRepository.findAllByUser(userId);
    }
    return [];
  }
}
