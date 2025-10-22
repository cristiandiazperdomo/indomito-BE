import { DataTypes, Model, Sequelize } from "sequelize";

export interface UserAttributes {
  id: string;
  name: string;
  lastname: string;
  password: string;
}

export type UserCreationAttributes = Omit<UserAttributes, "id">;

export type UserId = User["id"];

export class User
  extends Model<UserAttributes, UserAttributes>
  implements UserAttributes
{
  id!: string;
  name!: string;
  lastname!: string;
  password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof User {
    return User.init(
      {
        id: {
          type: DataTypes.STRING(50),
          allowNull: false,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: {
          type: DataTypes.STRING(52),
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING(52),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(48),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "user",
        schema: "public",
        timestamps: true,
      }
    );
  }
}
