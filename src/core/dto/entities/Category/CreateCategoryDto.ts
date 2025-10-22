import { IsNotEmpty, validate } from "class-validator";
import { DtoValidable } from "../../validations/DtoValidable";
import { CategoryCreationAttributes } from "../../../domain/models/Category";

export class CreateCategoryDto
  extends DtoValidable
  implements CategoryCreationAttributes
{
  id!: string;
  @IsNotEmpty({ message: "El nombre del producto es obligatorio" })
  name!: string;

  constructor(data?: any) {
    super();
    this.name = data.name;
  }

  async dtoValidate() {
    const errors = await validate(this);
    super.processErrorMessages(errors);
  }
}
