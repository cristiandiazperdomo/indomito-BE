import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import { Category } from "./Category";
import { Ingredient } from "./Ingredient";

export interface ProductAttributes {
  id: string;
  name: string;
  price: number;
}

export type ProductCreationAttributes = Omit<ProductAttributes, "id">;

export type ProductId = Product["id"];

export class Product
  extends Model<ProductAttributes, ProductAttributes>
  implements ProductAttributes
{
  id!: string;
  name!: string;
  price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public categories!: Category[];
  public ingredients!: Ingredient[];

  public getCategories!: Sequelize.BelongsToManyGetAssociationsMixin<Category>;
  public addCategory!: Sequelize.BelongsToManyAddAssociationMixin<
    Category,
    string
  >;
  public addCategories!: Sequelize.BelongsToManyAddAssociationsMixin<
    Category,
    string
  >;
  public setCategories!: Sequelize.BelongsToManySetAssociationsMixin<
    Category,
    string
  >;
  public createCategory!: Sequelize.BelongsToManyCreateAssociationMixin<Category>;

  public getIngredients!: Sequelize.BelongsToManyGetAssociationsMixin<Ingredient>;
  public addIngredient!: Sequelize.BelongsToManyAddAssociationMixin<
    Ingredient,
    string
  >;
  public addIngredients!: Sequelize.BelongsToManyAddAssociationsMixin<
    Ingredient,
    string
  >;
  public setIngredients!: Sequelize.BelongsToManySetAssociationsMixin<
    Ingredient,
    string
  >;
  public createIngredient!: Sequelize.BelongsToManyCreateAssociationMixin<Ingredient>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Product {
    return Product.init(
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
        price: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "product",
        schema: "public",
        timestamps: true,
      }
    );
  }
}
