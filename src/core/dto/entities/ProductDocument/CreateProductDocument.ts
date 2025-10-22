import { IsNotEmpty, IsString, validate } from "class-validator";
import { DtoValidable } from "../../validations/DtoValidable";
import { ProductDocumentCreationAttributes } from "../../../domain/models/ProductDocument";

export class CreateProductDocumentDto
  extends DtoValidable
  implements ProductDocumentCreationAttributes
{
  @IsString()
  @IsNotEmpty({ message: "El ID del producto es obligatorio" })
  productId!: string;

  @IsString()
  @IsNotEmpty({ message: "El nombre del archivo es obligatorio" })
  filename!: string;

  @IsString()
  @IsNotEmpty({ message: "La ruta del archivo es obligatoria" })
  path!: string;

  @IsString()
  @IsNotEmpty({ message: "El tipo MIME es obligatorio" })
  mimetype!: string;

  constructor(data?: any) {
    super();
    if (data) {
      this.productId = data.productId;
      this.filename = data.filename;
      this.path = data.path;
      this.mimetype = data.mimetype;
    }
  }

  async dtoValidate() {
    const errors = await validate(this);
    super.processErrorMessages(errors);
  }
}
