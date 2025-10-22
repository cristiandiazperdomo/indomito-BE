import { ValidationError } from "class-validator";
import { InvalidDataException } from "../../exceptions/InvalidDataException";

export class DtoValidable {
  public processErrorMessages(errors: ValidationError[]) {
    if (errors.length > 0) {
      const errorMessage = errors
        .map((error) => {
          const constraints = error.constraints
            ? Object.values(error.constraints).join("\n")
            : "Error no especificado";
          return `'${error.property}': ${constraints}`;
        })
        .join("\n");
      throw new InvalidDataException(`${errorMessage}`);
    }
    return errors;
  }
}
