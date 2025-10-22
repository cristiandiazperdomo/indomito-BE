import { Order } from "../../domain/models/Order";
import { CreateOrderDto } from "../../dto/entities/Order/CreateOrderDto";

export interface IOrderRepository {
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  create(order: CreateOrderDto): Promise<Order>;
  update(id: string, order: CreateOrderDto): Promise<Order>;
  delete(id: string): Promise<void>;
}
