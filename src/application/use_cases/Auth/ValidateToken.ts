import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";

@injectable()
export class ValidateToken {
  execute(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      throw new Error("Token inválido");
    }
  }
}
