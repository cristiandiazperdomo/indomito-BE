import { Router } from "express";
import { container } from "../../../config/inversify.config";
import { ProductController } from "../controller/Product/ProductController";

const router = Router();

const productController = container.get<ProductController>(ProductController);

router.get("/:id", async (req, res) =>
  productController.getProductById(req, res)
);
router.get("", async (req, res) => productController.getAllProducts(req, res));
router.post("", async (req, res) => productController.create(req, res));
router.delete("/:id", async (req, res) => productController.delete(req, res));
router.put("/:id", async (req, res) => productController.update(req, res));

export { router };
