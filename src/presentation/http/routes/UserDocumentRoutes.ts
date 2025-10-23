import { Router } from "express";
import { UserDocumentController } from "../controller/UserDocument/UserDocumentController";
import { container } from "../../../config/inversify.config";
import { upload } from "../../../config/multer";
import { authMiddleware } from "../../../infrastructure/middlewares/auth/AuthMiddleware";

const router = Router();

const userDocumentController = container.get<UserDocumentController>(
  UserDocumentController
);

router.get("/", authMiddleware, (req, res) =>
  userDocumentController.getAll(req, res)
);
router.get("/:id", authMiddleware, (req, res) =>
  userDocumentController.getById(req, res)
);
router.get("/user/:userId", authMiddleware, (req, res) =>
  userDocumentController.getByUserId(req, res)
);
router.post(
  "/",
  authMiddleware,
  (req, res, next) => {
    req.headers["x-upload-type"] = "user";
    next();
  },
  upload.single("file"),
  (req, res) => userDocumentController.create(req, res)
);
router.delete("/:id", authMiddleware, (req, res) =>
  userDocumentController.delete(req, res)
);

export { router };
