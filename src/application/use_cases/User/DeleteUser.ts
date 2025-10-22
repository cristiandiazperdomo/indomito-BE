import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types/types";
import { IUserRepository } from "../../../core/domain/interfaces/IUserRepository";

@injectable()
export class DeleteUser {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  async execute(id: string) {
    return await this.userRepository.delete(id);
  }
}
