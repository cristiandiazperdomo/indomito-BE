import { Model, DataTypes, Sequelize } from "sequelize";

export interface ProductDocumentAttributes {
  id: string;
  filename: string;
  path: string;
  mimetype: string;
  productId: string;
}

export type ProductDocumentCreationAttributes = Omit<
  ProductDocumentAttributes,
  "id"
>;

export class ProductDocument
  extends Model<ProductDocumentAttributes, ProductDocumentCreationAttributes>
  implements ProductDocumentAttributes
{
  id!: string;
  filename!: string;
  path!: string;
  mimetype!: string;
  productId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof ProductDocument {
    return ProductDocument.init(
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
        productId: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        tableName: "product_document",
        timestamps: true,
      }
    );
  }
}
