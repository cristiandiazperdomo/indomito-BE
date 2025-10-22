import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { getHttpStatusCode } from "../../status/Error";
import { validatePagingQueryParams } from "../../validation/validate_paging";
import { TYPES } from "../../../../config/types/types";
import { FindAllUsers } from "../../../../application/use_cases/User/FindAllUsers";
import { FindUserById } from "../../../../application/use_cases/User/FindUserById";
import { DeleteUser } from "../../../../application/use_cases/User/DeleteUser";
import { CreateUser } from "../../../../application/use_cases/User/CreateUser";
import { PagingDto } from "../../../../core/dto/paging/PagingDto";
import { extractFilter } from "../extractors/extractFilter";
import { extractPaging } from "../extractors/extractPaging";
import { UpdateUser } from "../../../../application/use_cases/User/UpdateUser";
import { FindAllUsersFilterDto } from "../../../../core/dto/entities/User/FindAllUsersFilterDto";
import { UserCreateDto } from "../../../../core/dto/entities/User/UserCreateDto";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.FindAllUsers) private findAllUsers: FindAllUsers,
    @inject(TYPES.FindUserById) private findUserById: FindUserById,
    @inject(TYPES.DeleteUser) private deleteUser: DeleteUser,
    @inject(TYPES.CreateUser) private createUser: CreateUser,
    @inject(TYPES.UpdateUser) private updateUser: UpdateUser
  ) {}

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      await validatePagingQueryParams(req);
      const filter: FindAllUsersFilterDto = await extractFilter(req);
      const paging: PagingDto = await extractPaging(req);

      const users = await this.findAllUsers.execute(filter, paging);
      res.json(users);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      if (!id) {
        res.status(400).json({ message: "El ID es obligatorio" });
        return;
      }

      const user = await this.findUserById.execute(id);
      res.json(user);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const userDto: UserCreateDto = new UserCreateDto(req.body);
      const newUser = await this.createUser.execute(userDto);
      res.status(204).send(newUser);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      if (!id) {
        res.status(400).json({ message: "El ID es obligatorio" });
        return;
      }

      await this.deleteUser.execute(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const userDto: UserCreateDto = new UserCreateDto(req.body);
      const updatedUser = await this.updateUser.execute(id, userDto);
      res.json(updatedUser);
    } catch (error: any) {
      res.status(getHttpStatusCode(error)).json({ message: error.message });
    }
  }
}
