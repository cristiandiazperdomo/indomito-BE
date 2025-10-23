import { AuthTypes } from "./Auth";
import { CategoryTypes } from "./Category";
import { IngredientTypes } from "./Ingredients";
import { OrderTypes } from "./Order";
import { ProductTypes } from "./Product";
import { ProductDocumentTypes } from "./ProductDocument";
import { UserTypes } from "./User";
import { UserDocumentTypes } from "./UserDocument";

export const TYPES = {
  ...UserTypes,
  ...ProductTypes,
  ...CategoryTypes,
  ...IngredientTypes,
  ...OrderTypes,
  ...ProductDocumentTypes,
  ...UserDocumentTypes,
  ...IngredientTypes,
  ...AuthTypes,
};
