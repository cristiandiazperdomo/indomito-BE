import { IsNotEmpty, validate } from "class-validator";
import { DtoValidable } from "../../validations/DtoValidable";

export class LoginDto extends DtoValidable {
  @IsNotEmpty({ message: "El nombre de usuario es obligatorio" })
  name!: string;

  @IsNotEmpty({ message: "La contraseña es obligatoria" })
  password!: string;

  constructor(data?: any) {
    super();
    if (data) {
      this.name = data.name;
      this.password = data.password;
    }
  }

  async dtoValidate() {
    const errors = await validate(this);
    super.processErrorMessages(errors);
  }
}
