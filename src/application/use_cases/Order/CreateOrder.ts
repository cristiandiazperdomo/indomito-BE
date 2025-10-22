import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IOrderRepository } from "../../../core/domain/interfaces/IOrderRepository";
import { CreateOrderDto } from "../../../core/dto/entities/Order/CreateOrderDto";

@injectable()
export class CreateOrder {
  constructor(
    @inject(TYPES.OrderRepository)
    private orderRepository: IOrderRepository
  ) {}

  async execute(orderDto: CreateOrderDto) {
    await orderDto.dtoValidate();
    return await this.orderRepository.create(orderDto);
  }
}
