import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IUserRepository } from "../../../core/domain/interfaces/IUserRepository";
import { UserCreateDto } from "../../../core/dto/entities/User/UserCreateDto";
import { hashPassword } from "../../../utils/password.util";

@injectable()
export class CreateUser {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  async execute(userDto: UserCreateDto) {
    await userDto.dtoValidate();
    userDto.password = await hashPassword(userDto.password);
    return await this.userRepository.create(userDto);
  }
}
