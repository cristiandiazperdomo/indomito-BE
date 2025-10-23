import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IUserRepository } from "../../../core/domain/interfaces/IUserRepository";
import { LoginDto } from "../../../core/dto/entities/Auth/LoginDto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

@injectable()
export class Login {
  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(
    loginDto: LoginDto
  ): Promise<{ token: string; refreshToken: string }> {
    await loginDto.dtoValidate();

    const user = await this.userRepository.findByName(loginDto.name);
    if (!user) throw new Error("Usuario no encontrado");

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password
    );
    if (!isPasswordValid) throw new Error("Contraseña incorrecta");

    const payload = { id: user.id, name: user.name };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "8h",
    });
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: "7d" }
    );

    return { token, refreshToken };
  }
}
