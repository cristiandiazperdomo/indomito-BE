import { UserDocumentCreationAttributes } from "../../../domain/models/UserDocument";

export class CreateUserDocumentDto implements UserDocumentCreationAttributes {
  filename: string;
  path: string;
  mimetype: string;
  userId: string;

  constructor(data: UserDocumentCreationAttributes) {
    this.filename = data.filename;
    this.path = data.path;
    this.mimetype = data.mimetype;
    this.userId = data.userId;
  }
}
