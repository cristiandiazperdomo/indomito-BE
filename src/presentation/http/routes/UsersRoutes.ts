import { Router } from "express";
import { UserController } from "../controller/User/UserController";
import { container } from "../../../config/inversify.config";

const router = Router();

const userController = container.get<UserController>(UserController);

router.get("/:id", async (req, res) => userController.getUserById(req, res));
router.get("", async (req, res) => userController.getAllUsers(req, res));
router.post("", async (req, res) => userController.create(req, res));
router.delete("/:id", async (req, res) => userController.delete(req, res));
router.put("/:id", async (req, res) => userController.update(req, res));

export { router };
