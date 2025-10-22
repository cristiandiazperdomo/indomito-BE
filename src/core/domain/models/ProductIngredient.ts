import { Model, DataTypes, Sequelize } from "sequelize";
import { Ingredient } from "./Ingredient";
import { Product } from "./Product";

export class ProductIngredient extends Model {
  static initModel(sequelize: Sequelize) {
    return ProductIngredient.init(
      {
        id: {
          type: DataTypes.STRING(50),
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        productId: {
          type: DataTypes.STRING(50),
          references: { model: Product, key: "id" },
        },
        ingredientId: {
          type: DataTypes.STRING(50),
          references: { model: Ingredient, key: "id" },
        },
      },
      { sequelize, tableName: "productingredient", timestamps: false }
    );
  }
}
