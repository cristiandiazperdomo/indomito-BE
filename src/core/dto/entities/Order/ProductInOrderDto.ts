import { IsNotEmpty, IsArray, IsString, IsNumber } from "class-validator";
import { DtoValidable } from "../../validations/DtoValidable";

export class ProductInOrderDto extends DtoValidable {
  @IsNotEmpty({ message: "El productId es obligatorio" })
  @IsString()
  productId!: string;

  @IsNumber({}, { message: "La cantidad debe ser un número" })
  quantity!: number;

  @IsArray()
  withoutIngredients!: string[];

  @IsArray()
  extraIngredients!: string[];
}
