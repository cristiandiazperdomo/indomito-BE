import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IOrderRepository } from "../../../core/domain/interfaces/IOrderRepository";

@injectable()
export class FindAllOrders {
  constructor(
    @inject(TYPES.OrderRepository)
    private orderRepository: IOrderRepository
  ) {}

  async execute() {
    return await this.orderRepository.findAll();
  }
}
