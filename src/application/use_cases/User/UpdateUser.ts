import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IUserRepository } from "../../../core/domain/interfaces/IUserRepository";
import { InvalidDataException } from "../../../core/exceptions/InvalidDataException";
import { UserCreateDto } from "../../../core/dto/entities/User/UserCreateDto";

@injectable()
export class UpdateUser {
  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(id: string, userDto: UserCreateDto) {
    if (!userDto) throw new InvalidDataException("userDto is missing");
    await userDto.dtoValidate();
    return this.userRepository.update(id, userDto);
  }
}
