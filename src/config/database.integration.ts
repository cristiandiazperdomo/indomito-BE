import { Sequelize } from "sequelize";
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

const sequelize: Sequelize = new Sequelize("sqlite:memory", {
  logging: false,
});

const syncTables = async () => {
  try {
    await User.sync({ force: true });
    await Product.sync({ force: true });
    await Category.sync({ force: true });
    await ProductCategory.sync({ force: true });
    await Ingredient.sync({ force: true });
    await ProductIngredient.sync({ force: true });
    await Order.sync({ force: true });
    await OrderProduct.sync({ force: true });
    await ProductDocument.sync({ force: true });
  } catch (error) {
    console.log("Error al sincronizar modelos con BD", error);
  }
};

const dbSync = async () => {
  console.log("DB sync");
  await initModels(sequelize);
  await syncTables();
};

export { sequelize, dbSync };
