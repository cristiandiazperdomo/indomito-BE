import { Router } from "express";
import { UserController } from "../controller/User/UserController";
import { container } from "../../../config/inversify.config";
import { authMiddleware } from "../../../infrastructure/middlewares/auth/AuthMiddleware";

const router = Router();

const userController = container.get<UserController>(UserController);

router.get("/:id", authMiddleware, async (req, res) =>
  userController.getUserById(req, res)
);
router.get("", authMiddleware, async (req, res) =>
  userController.getAllUsers(req, res)
);
router.post("", async (req, res) => userController.create(req, res));
router.delete("/:id", authMiddleware, async (req, res) =>
  userController.delete(req, res)
);
router.put("/:id", authMiddleware, async (req, res) =>
  userController.update(req, res)
);

export { router };
