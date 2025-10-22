import { ArrayNotEmpty, IsArray, IsNotEmpty, validate } from "class-validator";
import { DtoValidable } from "../../validations/DtoValidable";
import { ProductCreationAttributes } from "../../../domain/models/Product";

export class CreateProductDto
  extends DtoValidable
  implements ProductCreationAttributes
{
  id!: string;
  @IsNotEmpty({ message: "El nombre del producto es obligatorio" })
  name!: string;

  @IsNotEmpty({ message: "El precio es obligatorio" })
  price!: number;

  @IsArray({ message: "Las categorías deben ser un arreglo" })
  @ArrayNotEmpty({ message: "Debes seleccionar al menos una categoría" })
  categories!: string[];

  @IsArray({ message: "Los ingredientes deben ser un arreglo" })
  @ArrayNotEmpty({ message: "Debes seleccionar al menos un ingrediente" })
  ingredients!: string[];

  constructor(data?: any) {
    super();
    this.name = data.name;
    this.price = data.price;
    this.categories = data.categories;
    this.ingredients = data.ingredients;
  }

  async dtoValidate() {
    const errors = await validate(this);
    super.processErrorMessages(errors);
  }
}
