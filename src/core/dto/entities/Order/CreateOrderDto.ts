import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  validate,
} from "class-validator";
import { DtoValidable } from "../../validations/DtoValidable";
import { OrderCreationAttributes } from "../../../domain/models/Order";
import { ProductInOrderDto } from "./ProductInOrderDto";

export class CreateOrderDto
  extends DtoValidable
  implements OrderCreationAttributes
{
  @IsString()
  @IsNotEmpty({ message: "El usuario es obligatorio" })
  userId!: string;

  @IsNumber()
  @IsNotEmpty({ message: "El total es obligatorio" })
  total!: number;

  @IsString()
  @IsNotEmpty({ message: "El método de pago es obligatorio" })
  payMethod!: string;

  @IsArray({ message: "Los productos deben ser un arreglo" })
  @ArrayNotEmpty({ message: "Debe haber al menos un producto" })
  products!: ProductInOrderDto[];

  constructor(data?: any) {
    super();
    if (data) {
      this.userId = data.userId;
      this.total = data.total;
      this.payMethod = data.payMethod;
      this.products = data.products;
    }
  }

  async dtoValidate() {
    const errors = await validate(this);
    super.processErrorMessages(errors);
  }
}
