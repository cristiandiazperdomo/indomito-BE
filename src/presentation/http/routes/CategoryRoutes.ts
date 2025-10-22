import { Router } from "express";
import { container } from "../../../config/inversify.config";
import { CategoryController } from "../controller/Category/CategoryController";

const router = Router();

const productController = container.get<CategoryController>(CategoryController);

router.get("/:id", async (req, res) =>
  productController.getCategoryById(req, res)
);
router.get("", async (req, res) =>
  productController.getAllCategories(req, res)
);
router.post("", async (req, res) => productController.create(req, res));
router.delete("/:id", async (req, res) => productController.delete(req, res));
router.put("/:id", async (req, res) => productController.update(req, res));

export { router };
