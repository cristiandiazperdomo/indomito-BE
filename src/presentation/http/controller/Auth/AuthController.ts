import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../../config/types/types";
import { Login } from "../../../../application/use_cases/Auth/Login";
import { LoginDto } from "../../../../core/dto/entities/Auth/LoginDto";
import { getHttpStatusCode } from "../../status/Error";
import { ValidateToken } from "../../../../application/use_cases/Auth/ValidateToken";
import { RefreshToken } from "../../../../application/use_cases/Auth/RefreshToken";

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.Login)
    private login: Login,
    @inject(TYPES.RefreshToken) private refreshToken: RefreshToken,
    @inject(TYPES.ValidateToken) private validateToken: ValidateToken
  ) {}

  async loginUser(req: Request, res: Response) {
    try {
      const dto = new LoginDto(req.body);
      const tokens = await this.login.execute(dto);
      res.json(tokens);
    } catch (err: any) {
      res.status(getHttpStatusCode(err)).json({ message: err.message });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const tokens = this.refreshToken.execute(refreshToken);
      res.json(tokens);
    } catch (err: any) {
      res.status(getHttpStatusCode(err)).json({ message: err.message });
    }
  }

  async validate(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) throw new Error("Token no proporcionado");
      const token = authHeader.split(" ")[1];
      const payload = this.validateToken.execute(token);
      res.json(payload);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }
}
