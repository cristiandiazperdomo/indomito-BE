import { FindAllUsersFilterDto } from "../../dto/entities/User/FindAllUsersFilterDto";
import { UserCreateDto } from "../../dto/entities/User/UserCreateDto";
import type { DtoResponsePaging } from "../../dto/paging/DtoResponsePaging";
import type { PagingDto } from "../../dto/paging/PagingDto";
import type { User, UserAttributes } from "../models/User";

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByName(name: string): Promise<User | null>;
  findAll(
    filterDto: FindAllUsersFilterDto,
    pagingDto: PagingDto
  ): Promise<DtoResponsePaging<UserAttributes>>;
  create(user: UserCreateDto): Promise<User>;
  delete(id: string): Promise<void>;
  update(id: string, UserAttributes: UserAttributes): Promise<User>;
}
