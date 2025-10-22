import { Router } from "express";
import { IngredientController } from "../controller/Ingredient/IngredientController";
import { container } from "../../../config/inversify.config";

const ingredientController = container.get(IngredientController);
const router = Router();

router.get("/", (req, res) => ingredientController.getAllIngredients(req, res));
router.get("/:id", (req, res) =>
  ingredientController.getIngredientById(req, res)
);
router.post("/", (req, res) => ingredientController.create(req, res));
router.put("/:id", (req, res) => ingredientController.update(req, res));
router.delete("/:id", (req, res) => ingredientController.delete(req, res));

export { router };
