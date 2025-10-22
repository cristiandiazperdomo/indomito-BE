import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import { Product } from "./Product";
export interface CategoryAttributes {
  id: string;
  name: string;
}

export type CategoryCreationAttributes = Omit<CategoryAttributes, "id">;

export type CategoryId = Category["id"];

export class Category
  extends Model<CategoryAttributes, CategoryAttributes>
  implements CategoryAttributes
{
  id!: string;
  name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public products!: Product[];
  public getProducts!: Sequelize.BelongsToManyGetAssociationsMixin<Product>;
  public addProduct!: Sequelize.BelongsToManyAddAssociationMixin<
    Product,
    string
  >;
  public addProducts!: Sequelize.BelongsToManyAddAssociationsMixin<
    Product,
    string
  >;
  public setProducts!: Sequelize.BelongsToManySetAssociationsMixin<
    Product,
    string
  >;
  public createProduct!: Sequelize.BelongsToManyCreateAssociationMixin<Product>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Category {
    return Category.init(
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
        tableName: "category",
        schema: "public",
        timestamps: true,
      }
    );
  }
}
