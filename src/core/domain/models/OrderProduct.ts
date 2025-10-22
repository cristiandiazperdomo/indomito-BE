import { DataTypes, Model, Sequelize, Optional } from "sequelize";

export interface OrderProductAttributes {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  withoutIngredients: string[]; // lista de ingredientes quitados
  extraIngredients: string[]; // lista de ingredientes agregados
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderProductCreationAttributes
  extends Optional<OrderProductAttributes, "id" | "createdAt" | "updatedAt"> {}

export class OrderProduct
  extends Model<OrderProductAttributes, OrderProductCreationAttributes>
  implements OrderProductAttributes
{
  public id!: string;
  public orderId!: string;
  public productId!: string;
  public quantity!: number;
  public withoutIngredients!: string[];
  public extraIngredients!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof OrderProduct {
    OrderProduct.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        orderId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        productId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        withoutIngredients: {
          type: DataTypes.JSONB,
          allowNull: false,
          defaultValue: [],
        },
        extraIngredients: {
          type: DataTypes.JSONB,
          allowNull: false,
          defaultValue: [],
        },
      },
      {
        sequelize,
        modelName: "OrderProduct",
        tableName: "order_products",
        timestamps: true,
      }
    );

    return OrderProduct;
  }
}
