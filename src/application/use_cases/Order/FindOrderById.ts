import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IOrderRepository } from "../../../core/domain/interfaces/IOrderRepository";

@injectable()
export class FindOrderById {
  constructor(
    @inject(TYPES.OrderRepository)
    private orderRepository: IOrderRepository
  ) {}

  async execute(id: string) {
    return await this.orderRepository.findById(id);
  }
}
