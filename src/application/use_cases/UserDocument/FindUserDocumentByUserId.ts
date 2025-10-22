import { inject, injectable } from "inversify";
import { IUserDocumentRepository } from "../../../core/domain/interfaces/IUserDocumentRepository";
import { UserDocument } from "../../../core/domain/models/UserDocument";
import { TYPES } from "../../../config/types/types";

@injectable()
export class FindUserDocumentByUserId {
  constructor(
    @inject(TYPES.UserDocumentRepository)
    private userDocumentRepository: IUserDocumentRepository
  ) {}

  async execute(userId: string): Promise<UserDocument> {
    return await this.userDocumentRepository.findByUserId(userId);
  }
}
