import * as Sequelize from "sequelize";

import { Model, DataTypes } from "sequelize";

export interface IngredientAttributes {
  id: string;
  name: string;
}

export type IngredientCreationAttributes = Omit<IngredientAttributes, "id">;

export type IngredientId = Ingredient["id"];

export class Ingredient
  extends Model<IngredientAttributes, IngredientCreationAttributes>
  implements IngredientAttributes
{
  id!: string;
  name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Ingredient {
    return Ingredient.init(
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
      },
      {
        sequelize,
        tableName: "ingredient",
        schema: "public",
        timestamps: true,
      }
    );
  }
}
