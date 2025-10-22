import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IUserRepository } from "../../../core/domain/interfaces/IUserRepository";
import { UserCreateDto } from "../../../core/dto/entities/User/UserCreateDto";

@injectable()
export class CreateUser {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  async execute(userDto: UserCreateDto) {
    await userDto.dtoValidate();
    return await this.userRepository.create(userDto);
  }
}
