import { Model, DataTypes, Sequelize } from "sequelize";

export interface UserDocumentAttributes {
  id: string;
  filename: string;
  path: string;
  mimetype: string;
  userId: string;
}

export type UserDocumentCreationAttributes = Omit<
  UserDocumentAttributes,
  "id"
>;

export class UserDocument
  extends Model<UserDocumentAttributes, UserDocumentCreationAttributes>
  implements UserDocumentAttributes
{
  id!: string;
  filename!: string;
  path!: string;
  mimetype!: string;
  userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof UserDocument {
    return UserDocument.init(
      {
        id: {
          type: DataTypes.STRING(50),
          allowNull: false,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        filename: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        path: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        mimetype: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        userId: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        tableName: "user_document",
        timestamps: true,
      }
    );
  }
}
