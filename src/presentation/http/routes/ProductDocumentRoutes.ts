import { Router } from "express";
import { ProductDocumentController } from "../controller/ProductDocument/ProductDocumentController";
import { container } from "../../../config/inversify.config";
import { upload } from "../../../config/multer";
import { authMiddleware } from "../../../infrastructure/middlewares/auth/AuthMiddleware";

const router = Router();

const productDocumentController = container.get<ProductDocumentController>(
  ProductDocumentController
);

router.get("/", authMiddleware, (req, res) =>
  productDocumentController.getAll(req, res)
);
router.get("/:id", authMiddleware, (req, res) =>
  productDocumentController.getById(req, res)
);
router.get("/product/:productId", authMiddleware, (req, res) =>
  productDocumentController.getByProductId(req, res)
);
router.post(
  "/",
  authMiddleware,
  (req, res, next) => {
    req.headers["x-upload-type"] = "product";
    next();
  },
  upload.single("file"),
  authMiddleware,
  (req, res) => productDocumentController.create(req, res)
);
router.delete("/:id", authMiddleware, (req, res) =>
  productDocumentController.delete(req, res)
);

export { router };
