import { Router } from "express";
import { container } from "../../../config/inversify.config";
import { CategoryController } from "../controller/Category/CategoryController";
import { authMiddleware } from "../../../infrastructure/middlewares/auth/AuthMiddleware";

const router = Router();

const productController = container.get<CategoryController>(CategoryController);

router.get("/:id", authMiddleware, async (req, res) =>
  productController.getCategoryById(req, res)
);
router.get("", authMiddleware, async (req, res) =>
  productController.getAllCategories(req, res)
);
router.post("", authMiddleware, async (req, res) => productController.create(req, res));
router.delete("/:id", authMiddleware, async (req, res) => productController.delete(req, res));
router.put("/:id", authMiddleware, async (req, res) => productController.update(req, res));

export { router };
