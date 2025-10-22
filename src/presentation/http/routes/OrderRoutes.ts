import { Router } from "express";
import { container } from "../../../config/inversify.config";
import { OrderController } from "../controller/Order/OrderController";

const router = Router();
const controller = container.get<OrderController>(OrderController);

router.post("/", (req, res) => controller.create(req, res));
router.get("/", (req, res) => controller.findAll(req, res));
router.get("/:id", (req, res) => controller.findById(req, res));

export { router };
