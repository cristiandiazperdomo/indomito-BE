import { Router } from "express";
import { ProductDocumentController } from "../controller/ProductDocument/ProductDocumentController";
import { container } from "../../../config/inversify.config";
import { upload } from "../../../config/multer";

const router = Router();

const productDocumentController = container.get<ProductDocumentController>(
  ProductDocumentController
);

router.get("/", (req, res) => productDocumentController.getAll(req, res));
router.get("/:id", (req, res) => productDocumentController.getById(req, res));
router.get("/product/:productId", (req, res) => productDocumentController.getByProductId(req, res));
router.post("/", (req, res, next) => {
  req.headers['x-upload-type'] = "product";
  next();
}, upload.single("file"), (req, res) => productDocumentController.create(req, res));
router.delete("/:id", (req, res) => productDocumentController.delete(req, res));

export { router };
