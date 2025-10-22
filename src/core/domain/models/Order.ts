import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import { Product } from "./Product";

export interface OrderAttributes {
  id: string;
  userId: string;
  total: number;
  payMethod: string;
}

export type OrderCreationAttributes = Omit<OrderAttributes, "id">;

export type OrderId = Order["id"];

export class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  id!: string;
  userId!: string;
  total!: number;
  payMethod!: string;

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

  static initModel(sequelize: Sequelize.Sequelize): typeof Order {
    return Order.init(
      {
        id: {
          type: DataTypes.STRING(50),
          allowNull: false,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        userId: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        total: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        payMethod: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "order",
        schema: "public",
        timestamps: true,
      }
    );
  }
}
