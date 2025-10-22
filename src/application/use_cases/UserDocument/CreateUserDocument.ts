import { inject, injectable } from "inversify";
import { IUserDocumentRepository } from "../../../core/domain/interfaces/IUserDocumentRepository";
import { UserDocument } from "../../../core/domain/models/UserDocument";
import { CreateUserDocumentDto } from "../../../core/dto/entities/UserDocument/CreateUserDocumentDto";
import { TYPES } from "../../../config/types/types";

@injectable()
export class CreateUserDocument {
  constructor(
    @inject(TYPES.UserDocumentRepository)
    private userDocumentRepository: IUserDocumentRepository
  ) {}

  async execute(data: CreateUserDocumentDto): Promise<UserDocument> {
    return await this.userDocumentRepository.create(data);
  }
}
