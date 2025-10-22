import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { User } from "../core/domain/models/User";
import { initModels } from "../core/domain/models/init-models";
import { Product } from "../core/domain/models/Product";
import { Category } from "../core/domain/models/Category";
import { ProductCategory } from "../core/domain/models/ProductCategory";
import { Ingredient } from "../core/domain/models/Ingredient";
import { ProductIngredient } from "../core/domain/models/ProductIngredient";
import { Order } from "../core/domain/models/Order";
import { OrderProduct } from "../core/domain/models/OrderProduct";
import { ProductDocument } from "../core/domain/models/ProductDocument";
import { UserDocument } from "../core/domain/models/UserDocument";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT) ?? 5432,
    dialect: "postgres",
    logging: false,
  }
);

const syncTables = async () => {
  try {
    if (process.env.DB_SYNC === "true") {
      console.log("Sincronizando modelos con base de datos");
      await User.sync();
      await Product.sync();
      await Category.sync();
      await ProductCategory.sync();
      await Ingredient.sync();
      await ProductIngredient.sync();
      await Order.sync();
      await OrderProduct.sync();
      await ProductDocument.sync();
      await UserDocument.sync();
      console.log("Modelos sincronizados");
    }
  } catch (error) {
    console.log("Error al sincronizar: ", error);
  }
};

const dbSync = async () => {
  await initModels(sequelize);
  await syncTables();
};

export { sequelize, dbSync };
