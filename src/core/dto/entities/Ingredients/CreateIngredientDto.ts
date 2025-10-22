import { IsNotEmpty, validate } from "class-validator";
import { DtoValidable } from "../../validations/DtoValidable";
import { IngredientCreationAttributes } from "../../../domain/models/Ingredient";

export class CreateIngredientDto
  extends DtoValidable
  implements IngredientCreationAttributes
{
  id!: string;
  @IsNotEmpty({ message: "El nombre del ingrediente es obligatorio" })
  name!: string;

  constructor(data?: any) {
    super();
    if (data) this.name = data.name;
  }

  async dtoValidate() {
    const errors = await validate(this);
    super.processErrorMessages(errors);
  }
}
