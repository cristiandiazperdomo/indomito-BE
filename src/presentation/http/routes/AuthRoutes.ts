import { Router } from "express";
import { container } from "../../../config/inversify.config";
import { AuthController } from "../controller/Auth/AuthController";

const router = Router();
const authController = container.get<AuthController>(AuthController);

router.post("/login", (req, res) => authController.loginUser(req, res));

export { router };
