import { Router } from "express";
import { IngredientController } from "../controller/Ingredient/IngredientController";
import { container } from "../../../config/inversify.config";
import { authMiddleware } from "../../../infrastructure/middlewares/auth/AuthMiddleware";

const ingredientController = container.get(IngredientController);
const router = Router();

router.get("/", authMiddleware, (req, res) =>
  ingredientController.getAllIngredients(req, res)
);
router.get("/:id", authMiddleware, (req, res) =>
  ingredientController.getIngredientById(req, res)
);
router.post("/", authMiddleware, (req, res) =>
  ingredientController.create(req, res)
);
router.put("/:id", authMiddleware, (req, res) =>
  ingredientController.update(req, res)
);
router.delete("/:id", authMiddleware, (req, res) =>
  ingredientController.delete(req, res)
);

export { router };
