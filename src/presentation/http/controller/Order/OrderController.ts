import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../../config/types/types";
import { CreateOrder } from "../../../../application/use_cases/Order/CreateOrder";
import { FindAllOrders } from "../../../../application/use_cases/Order/FindAllOrders";
import { FindOrderById } from "../../../../application/use_cases/Order/FindOrderById";
import { CreateOrderDto } from "../../../../core/dto/entities/Order/CreateOrderDto";

@injectable()
export class OrderController {
  constructor(
    @inject(TYPES.CreateOrder) private createOrder: CreateOrder,
    @inject(TYPES.FindAllOrders) private findAllOrders: FindAllOrders,
    @inject(TYPES.FindOrderById) private findOrderById: FindOrderById
  ) {}

  async create(req: Request, res: Response) {
    try {
      const dto = new CreateOrderDto(req.body);
      const result = await this.createOrder.execute(dto);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await this.findAllOrders.execute();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.findOrderById.execute(id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
