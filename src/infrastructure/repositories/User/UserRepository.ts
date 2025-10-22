import { injectable } from "inversify";
import { UniqueConstraintError } from "sequelize";
import { IUserRepository } from "../../../core/domain/interfaces/IUserRepository";
import { PagingDto } from "../../../core/dto/paging/PagingDto";
import { DtoResponsePaging } from "../../../core/dto/paging/DtoResponsePaging";
import { User, UserAttributes } from "../../../core/domain/models/User";
import { prepareFiltersFindAll } from "./prepareFilterFindAll";
import { NotFoundException } from "../../../core/exceptions/NotFoundException";
import { ElementAlreadyExistsException } from "../../../core/exceptions/ElementAlreadyExistsException";
import { FindAllUsersFilterDto } from "../../../core/dto/entities/User/FindAllUsersFilterDto";
import { UserCreateDto } from "../../../core/dto/entities/User/UserCreateDto";

@injectable()
export class UserRepository implements IUserRepository {
  public async findAll(
    filterDto: FindAllUsersFilterDto,
    pagingDto: PagingDto
  ): Promise<DtoResponsePaging<UserAttributes>> {
    const dtoResponsePaging: DtoResponsePaging<UserAttributes> =
      new DtoResponsePaging();

    const filterWithPaging = prepareFiltersFindAll(filterDto, pagingDto);

    const filterWithoutPaging = { where: filterWithPaging.where };

    dtoResponsePaging.count = await User.count(filterWithoutPaging);
    dtoResponsePaging.items = await User.findAll(filterWithPaging);

    return dtoResponsePaging;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await User.findByPk(id);

    if (!user) throw new NotFoundException("User not found");

    return user;
  }

  public async create(user: UserCreateDto): Promise<User> {
    try {
      return await User.create(user);
    } catch (error: any) {
      if (error instanceof UniqueConstraintError) {
        throw new ElementAlreadyExistsException("User already exist");
      }
      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    const user = await User.findByPk(id);
    if (!user) throw new NotFoundException("User not found");
    await user.destroy();
  }

  public async update(id: string, user: UserAttributes): Promise<User> {
    const foundUser = await User.findByPk(id);
    if (!foundUser) throw new NotFoundException("User not found");
    foundUser.update(user);
    return foundUser;
  }
}
