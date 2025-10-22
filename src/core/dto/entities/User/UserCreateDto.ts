import { IsNotEmpty, validate } from "class-validator";
import { DtoValidable } from "../../validations/DtoValidable";
import { UserCreationAttributes } from "../../../domain/models/User";

export class UserCreateDto
  extends DtoValidable
  implements UserCreationAttributes
{
  id!: string;
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  name!: string;

  @IsNotEmpty({ message: "El apellido es obligatorio" })
  lastname!: string;

  @IsNotEmpty({ message: "La constraseña es obligatorio" })
  password!: string;

  constructor(data?: any) {
    super();
    this.name = data.name;
    this.lastname = data.lastname;
    this.password = data.password;
  }

  async dtoValidate() {
    const errors = await validate(this);
    super.processErrorMessages(errors);
  }
}
