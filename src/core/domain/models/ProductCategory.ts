import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import type { Product, ProductId } from "./Product";
import type { Category, CategoryId } from "./Category";

export interface ProductCategoryAttributes {
  id: string;
  productId: string;
  categoryId: string;
}

export type ProductCategoryPk = "id";
export type ProductCategoryId = ProductCategory[ProductCategoryPk];
export type ProductCategoryCreationAttributes = ProductCategoryAttributes;

export class ProductCategory
  extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes>
  implements ProductCategoryAttributes
{
  public id!: string;
  public productId!: string;
  public categoryId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public product!: Product;
  public category!: Category;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductCategory {
    return ProductCategory.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        productId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: "Product", key: "id" },
          unique: "product_category_unique_key",
        },
        categoryId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: "Category", key: "id" },
          unique: "product_category_unique_key",
        },
      },
      {
        sequelize,
        tableName: "productcategory",
        timestamps: true,
        indexes: [
          {
            name: "product_category_unique_key",
            unique: true,
            fields: ["productId", "categoryId"],
          },
        ],
      }
    );
  }
}
