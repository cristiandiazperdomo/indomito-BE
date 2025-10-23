import { Router } from "express";
import { container } from "../../../config/inversify.config";
import { OrderController } from "../controller/Order/OrderController";
import { authMiddleware } from "../../../infrastructure/middlewares/auth/AuthMiddleware";

const router = Router();
const controller = container.get<OrderController>(OrderController);

router.post("/", authMiddleware, (req, res) => controller.create(req, res));
router.get("/", authMiddleware, (req, res) => controller.findAll(req, res));
router.get("/:id", authMiddleware, (req, res) => controller.findById(req, res));

export { router };
