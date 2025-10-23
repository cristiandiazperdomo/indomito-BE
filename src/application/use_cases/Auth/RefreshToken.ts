import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import { TokenDto } from "../../../core/dto/entities/Auth/TokenDto";

@injectable()
export class RefreshToken {
  execute(refreshToken: string): TokenDto {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      ) as any;
      const newToken = jwt.sign(
        { id: payload.id, name: payload.name },
        process.env.JWT_SECRET as string,
        { expiresIn: "8h" }
      );
      const newRefreshToken = jwt.sign(
        { id: payload.id, name: payload.name },
        process.env.JWT_REFRESH_SECRET as string,
        { expiresIn: "7d" }
      );
      return new TokenDto(newToken, newRefreshToken);
    } catch (err) {
      throw new Error("Refresh token inválido");
    }
  }
}
