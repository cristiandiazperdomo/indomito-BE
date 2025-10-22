import { injectable } from "inversify";
import { UniqueConstraintError, Op } from "sequelize";
import { IOrderRepository } from "../../../core/domain/interfaces/IOrderRepository";
import { ElementAlreadyExistsException } from "../../../core/exceptions/ElementAlreadyExistsException";
import { Product } from "../../../core/domain/models/Product";
import { Order } from "../../../core/domain/models/Order";
import { CreateOrderDto } from "../../../core/dto/entities/Order/CreateOrderDto";
import { Ingredient } from "../../../core/domain/models/Ingredient";

@injectable()
export class OrderRepository implements IOrderRepository {
  public async findAll(): Promise<Order[]> {
    return Order.findAll({ include: [{ model: Product, as: "products" }] });
  }

  public async findById(id: string): Promise<Order | null> {
    return Order.findByPk(id, {
      include: [
        {
          model: Product,
          as: "products",
          through: { attributes: [] },
          include: [
            {
              model: Ingredient,
              as: "ingredients",
              through: { attributes: [] },
            },
          ],
        },
      ],
    });
  }

  public async create(orderDto: CreateOrderDto): Promise<Order> {
    const { userId, total, payMethod, products } = orderDto;
    try {
      const order = await Order.create({ userId, total, payMethod });

      if (products && products.length > 0) {
        const productIds = products.map((p) => p.productId);

        const productInstances = await Product.findAll({
          where: { id: { [Op.in]: productIds } },
        });

        if (productInstances.length !== products.length) {
          await order.destroy();
          throw new Error("Uno o más productos no existen");
        }

        await order.setProducts(productInstances);
      }

      return (await Order.findByPk(order.id, {
        include: [{ model: Product, as: "products" }],
      })) as Order;
    } catch (error: any) {
      if (error instanceof UniqueConstraintError) {
        throw new ElementAlreadyExistsException("Order already exists");
      }
      throw error;
    }
  }

  public async update(id: string, orderDto: CreateOrderDto): Promise<Order> {
    const order = await Order.findByPk(id);
    if (!order) throw new Error("Order not found");

    await order.update(orderDto);

    return order;
  }

  public async delete(id: string): Promise<void> {
    await Order.destroy({ where: { id } });
  }
}
