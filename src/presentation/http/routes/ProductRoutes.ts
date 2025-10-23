import { Router } from "express";
import { container } from "../../../config/inversify.config";
import { ProductController } from "../controller/Product/ProductController";
import { authMiddleware } from "../../../infrastructure/middlewares/auth/AuthMiddleware";

const router = Router();

const productController = container.get<ProductController>(ProductController);

router.get("/:id", async (req, res) =>
  productController.getProductById(req, res)
);
router.get("", authMiddleware, async (req, res) => productController.getAllProducts(req, res));
router.post("", authMiddleware, async (req, res) => productController.create(req, res));
router.delete("/:id", authMiddleware, async (req, res) => productController.delete(req, res));
router.put("/:id", authMiddleware, async (req, res) => productController.update(req, res));

export { router };
