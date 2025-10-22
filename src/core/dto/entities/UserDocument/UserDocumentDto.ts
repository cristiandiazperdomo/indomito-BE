import { UserDocument } from "../../../domain/models/UserDocument";

export class UserDocumentDto {
  id: string;
  filename: string;
  path: string;
  mimetype: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(userDocument: UserDocument) {
    this.id = userDocument.id;
    this.filename = userDocument.filename;
    this.path = userDocument.path;
    this.mimetype = userDocument.mimetype;
    this.userId = userDocument.userId;
    this.createdAt = userDocument.createdAt;
    this.updatedAt = userDocument.updatedAt;
  }
}
