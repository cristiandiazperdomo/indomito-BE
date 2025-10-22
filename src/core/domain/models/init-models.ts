import { Category } from "./Category";
import { Ingredient } from "./Ingredient";
import { Order } from "./Order";
import { OrderProduct } from "./OrderProduct";
import { Product } from "./Product";
import { ProductCategory } from "./ProductCategory";
import { ProductDocument } from "./ProductDocument";
import { ProductIngredient } from "./ProductIngredient";
import { User } from "./User";
import { UserDocument } from "./UserDocument";
import type { Sequelize } from "sequelize";

export function initModels(sequelize: Sequelize) {
  const user = User.initModel(sequelize);
  const product = Product.initModel(sequelize);
  const category = Category.initModel(sequelize);
  const ingredient = Ingredient.initModel(sequelize);
  const productIngredient = ProductIngredient.initModel(sequelize);
  const productCategory = ProductCategory.initModel(sequelize);
  const order = Order.initModel(sequelize);
  const orderProduct = OrderProduct.initModel(sequelize);
  const productDocument = ProductDocument.initModel(sequelize);
  const userDocument = UserDocument.initModel(sequelize);

  Product.belongsToMany(Category, {
    through: productCategory,
    as: "categories",
    foreignKey: "productId",
  });

  Category.belongsToMany(Product, {
    through: productCategory,
    as: "products",
    foreignKey: "categoryId",
  });

  Product.belongsToMany(Ingredient, {
    through: ProductIngredient,
    as: "ingredients",
    foreignKey: "productId",
  });

  Ingredient.belongsToMany(Product, {
    through: ProductIngredient,
    as: "products",
    foreignKey: "ingredientId",
  });

  Order.belongsToMany(Product, {
    through: orderProduct,
    as: "products",
    foreignKey: "orderId",
  });

  Product.belongsToMany(Order, {
    through: orderProduct,
    as: "orders",
    foreignKey: "productId",
  });

  User.hasMany(Order, { as: "orders", foreignKey: "userId" });
  Order.belongsTo(User, { as: "user", foreignKey: "userId" });

  Product.hasMany(ProductDocument, {
    as: "documents",
    foreignKey: "productId",
  });
  ProductDocument.belongsTo(Product, {
    as: "product",
    foreignKey: "productId",
  });

  User.hasMany(UserDocument, {
    as: "documents",
    foreignKey: "userId",
  });
  UserDocument.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
  });

  return {
    user,
    product,
    category,
    ingredient,
    productIngredient,
    productCategory,
    order,
    orderProduct,
    productDocument,
    userDocument,
  };
}
