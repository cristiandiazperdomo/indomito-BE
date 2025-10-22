import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IUserRepository } from "../../../core/domain/interfaces/IUserRepository";
import { PagingDto } from "../../../core/dto/paging/PagingDto";
import { FindAllUsersFilterDto } from "../../../core/dto/entities/User/FindAllUsersFilterDto";

@injectable()
export class FindAllUsers {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  async execute(filterDto: FindAllUsersFilterDto, pagingDto: PagingDto) {
    return await this.userRepository.findAll(filterDto, pagingDto);
  }
}
