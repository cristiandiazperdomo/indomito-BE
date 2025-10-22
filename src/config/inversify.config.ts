import { Container } from "inversify";
import { TYPES } from "./types/types";
import { IUserRepository } from "../core/domain/interfaces/IUserRepository";
import { UserRepository } from "../infrastructure/repositories/User/UserRepository";
import { FindUserById } from "../application/use_cases/User/FindUserById";
import { FindAllUsers } from "../application/use_cases/User/FindAllUsers";
import { CreateUser } from "../application/use_cases/User/CreateUser";
import { DeleteUser } from "../application/use_cases/User/DeleteUser";
import { UserController } from "../presentation/http/controller/User/UserController";
import { IProductRepository } from "../core/domain/interfaces/IProductRepository";
import { ProductRepository } from "../infrastructure/repositories/Product/ProductRepository";
import { FindProductById } from "../application/use_cases/Product/FindProductById";
import { FindAllProducts } from "../application/use_cases/Product/FindAllProducts";
import { CreateProduct } from "../application/use_cases/Product/CreateProduct";
import { DeleteProduct } from "../application/use_cases/Product/DeleteProduct";
import { ProductController } from "../presentation/http/controller/Product/ProductController";
import { UpdateProduct } from "../application/use_cases/Product/UpdateProduct";
import { UpdateUser } from "../application/use_cases/User/UpdateUser";
import { ICategoryRepository } from "../core/domain/interfaces/ICategoryRepository";
import { FindCategoryById } from "../application/use_cases/Category/FindCategoryById";
import { FindAllCategories } from "../application/use_cases/Category/FindAllCategories";
import { CreateCategory } from "../application/use_cases/Category/CreateCategory";
import { DeleteCategory } from "../application/use_cases/Category/DeleteCategory";
import { UpdateCategory } from "../application/use_cases/Category/UpdateCategory";
import { CategoryController } from "../presentation/http/controller/Category/CategoryController";
import { CategoryRepository } from "../infrastructure/repositories/Category/CategoryRepository";
import { FindAllIngredients } from "../application/use_cases/Ingredient/FindAllIngredients";
import { FindIngredientById } from "../application/use_cases/Ingredient/FindIngredientById";
import { CreateIngredient } from "../application/use_cases/Ingredient/CreateIngredient";
import { UpdateIngredient } from "../application/use_cases/Ingredient/UpdateIngredient";
import { DeleteIngredient } from "../application/use_cases/Ingredient/DeleteIngredient";
import { IngredientRepository } from "../infrastructure/repositories/Ingredient/IngredientRepository";
import { IIngredientRepository } from "../core/domain/interfaces/IIngredientRepository";
import { IngredientController } from "../presentation/http/controller/Ingredient/IngredientController";
import { OrderController } from "../presentation/http/controller/Order/OrderController";
import { FindOrderById } from "../application/use_cases/Order/FindOrderById";
import { FindAllOrders } from "../application/use_cases/Order/FindAllOrders";
import { CreateOrder } from "../application/use_cases/Order/CreateOrder";
import { IOrderRepository } from "../core/domain/interfaces/IOrderRepository";
import { OrderRepository } from "../infrastructure/repositories/Order/OrderRepository";
import { ProductDocumentController } from "../presentation/http/controller/ProductDocument/ProductDocumentController";
import { DeleteProductDocument } from "../application/use_cases/ProductDocument/DeleteProductDocument";
import { FindProductDocumentById } from "../application/use_cases/ProductDocument/FindProductDocumentById";
import { FindAllProductDocuments } from "../application/use_cases/ProductDocument/FindAllProductDocuments";
import { CreateProductDocument } from "../application/use_cases/ProductDocument/CreateProductDocument";
import { FindProductDocumentByProductId } from "../application/use_cases/ProductDocument/FindProductDocumentByProductId";
import { IProductDocumentRepository } from "../core/domain/interfaces/IProductDocumentRepository";
import { ProductDocumentRepository } from "../infrastructure/repositories/ProductDocument.ts/ProductDocumentRepository";
import { UserDocumentController } from "../presentation/http/controller/UserDocument/UserDocumentController";
import { DeleteUserDocument } from "../application/use_cases/UserDocument/DeleteUserDocument";
import { FindUserDocumentById } from "../application/use_cases/UserDocument/FindUserDocumentById";
import { FindAllUserDocuments } from "../application/use_cases/UserDocument/FindAllUserDocuments";
import { CreateUserDocument } from "../application/use_cases/UserDocument/CreateUserDocument";
import { FindUserDocumentByUserId } from "../application/use_cases/UserDocument/FindUserDocumentByUserId";
import { IUserDocumentRepository } from "../core/domain/interfaces/IUserDocumentRepository";
import { UserDocumentRepository } from "../infrastructure/repositories/UserDocument/UserDocumentRepository";

const container = new Container();

const userContainer = () => {
  container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);

  container.bind<FindUserById>(TYPES.FindUserById).to(FindUserById);
  container.bind<FindAllUsers>(TYPES.FindAllUsers).to(FindAllUsers);
  container.bind<CreateUser>(TYPES.CreateUser).to(CreateUser);
  container.bind<DeleteUser>(TYPES.DeleteUser).to(DeleteUser);
  container.bind<UpdateUser>(TYPES.UpdateUser).to(UpdateUser);
  container.bind<UserController>(UserController).toSelf();
};

const productContainer = () => {
  container
    .bind<IProductRepository>(TYPES.ProductRepository)
    .to(ProductRepository);

  container.bind<FindProductById>(TYPES.FindProductById).to(FindProductById);
  container.bind<FindAllProducts>(TYPES.FindAllProducts).to(FindAllProducts);
  container.bind<CreateProduct>(TYPES.CreateProduct).to(CreateProduct);
  container.bind<DeleteProduct>(TYPES.DeleteProduct).to(DeleteProduct);
  container.bind<UpdateProduct>(TYPES.UpdateProduct).to(UpdateProduct);
  container.bind<ProductController>(ProductController).toSelf();
};

const categoryContainer = () => {
  container
    .bind<ICategoryRepository>(TYPES.CategoryRepository)
    .to(CategoryRepository);

  container.bind<FindCategoryById>(TYPES.FindCategoryById).to(FindCategoryById);
  container
    .bind<FindAllCategories>(TYPES.FindAllCategories)
    .to(FindAllCategories);
  container.bind<CreateCategory>(TYPES.CreateCategory).to(CreateCategory);
  container.bind<DeleteCategory>(TYPES.DeleteCategory).to(DeleteCategory);
  container.bind<UpdateCategory>(TYPES.UpdateCategory).to(UpdateCategory);
  container.bind<CategoryController>(CategoryController).toSelf();
};

const ingredientContainer = () => {
  container
    .bind<IIngredientRepository>(TYPES.IngredientRepository)
    .to(IngredientRepository);

  container
    .bind<FindAllIngredients>(TYPES.FindAllIngredients)
    .to(FindAllIngredients);
  container
    .bind<FindIngredientById>(TYPES.FindIngredientById)
    .to(FindIngredientById);
  container.bind<CreateIngredient>(TYPES.CreateIngredient).to(CreateIngredient);
  container.bind<UpdateIngredient>(TYPES.UpdateIngredient).to(UpdateIngredient);
  container.bind<DeleteIngredient>(TYPES.DeleteIngredient).to(DeleteIngredient);

  container.bind<IngredientController>(IngredientController).toSelf();
};

const orderContainer = () => {
  container.bind<IOrderRepository>(TYPES.OrderRepository).to(OrderRepository);

  container.bind<CreateOrder>(TYPES.CreateOrder).to(CreateOrder);
  container.bind<FindAllOrders>(TYPES.FindAllOrders).to(FindAllOrders);
  container.bind<FindOrderById>(TYPES.FindOrderById).to(FindOrderById);

  container.bind<OrderController>(OrderController).toSelf();
};

const productDocumentContainer = () => {
  container
    .bind<IProductDocumentRepository>(TYPES.ProductDocumentRepository)
    .to(ProductDocumentRepository);

  container
    .bind<CreateProductDocument>(TYPES.CreateProductDocument)
    .to(CreateProductDocument);
  container
    .bind<FindAllProductDocuments>(TYPES.FindAllProductDocuments)
    .to(FindAllProductDocuments);
  container
    .bind<FindProductDocumentById>(TYPES.FindProductDocumentById)
    .to(FindProductDocumentById);
  container
    .bind<DeleteProductDocument>(TYPES.DeleteProductDocument)
    .to(DeleteProductDocument);
  container
    .bind<FindProductDocumentByProductId>(TYPES.FindProductDocumentByProductId)
    .to(FindProductDocumentByProductId);
  container.bind<ProductDocumentController>(ProductDocumentController).toSelf();
};

const userDocumentContainer = () => {
  container
    .bind<IUserDocumentRepository>(TYPES.UserDocumentRepository)
    .to(UserDocumentRepository);

  container
    .bind<CreateUserDocument>(TYPES.CreateUserDocument)
    .to(CreateUserDocument);
  container
    .bind<FindAllUserDocuments>(TYPES.FindAllUserDocuments)
    .to(FindAllUserDocuments);
  container
    .bind<FindUserDocumentById>(TYPES.FindUserDocumentById)
    .to(FindUserDocumentById);
  container
    .bind<DeleteUserDocument>(TYPES.DeleteUserDocument)
    .to(DeleteUserDocument);
  container
    .bind<FindUserDocumentByUserId>(TYPES.FindUserDocumentByUserId)
    .to(FindUserDocumentByUserId);
  container.bind<UserDocumentController>(UserDocumentController).toSelf();
};

const setContainers = () => {
  userContainer();
  productContainer();
  categoryContainer();
  ingredientContainer();
  orderContainer();
  productDocumentContainer();
  userDocumentContainer();
};

setContainers();

export { container };
