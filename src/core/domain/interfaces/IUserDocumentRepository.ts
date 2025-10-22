import { UserDocument, UserDocumentCreationAttributes } from "../../domain/models/UserDocument";

export interface IUserDocumentRepository {
  create(data: UserDocumentCreationAttributes): Promise<UserDocument>;
  findAllByUser(userId: string): Promise<UserDocument[]>;
  findById(id: string): Promise<UserDocument | null>;
  delete(id: string): Promise<UserDocument>;
  findByUserId(userId: string): Promise<UserDocument>;
}
