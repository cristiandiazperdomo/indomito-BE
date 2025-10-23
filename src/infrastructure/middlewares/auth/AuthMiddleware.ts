import { Request, Response, NextFunction } from "express";
import { container } from "../../../config/inversify.config";
import { TYPES } from "../../../config/types/types";
import { ValidateToken } from "../../../application/use_cases/Auth/ValidateToken";
import { getHttpStatusCode } from "../../../presentation/http/status/Error";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "Token no provisto" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token inválido" });

    const validateTokenUseCase = container.get<ValidateToken>(
      TYPES.ValidateToken
    );
    const payload = await validateTokenUseCase.execute(token);

    (req as any).user = payload;
    next();
  } catch (error: any) {
    res.status(getHttpStatusCode(error)).json({ message: error.message });
  }
};
