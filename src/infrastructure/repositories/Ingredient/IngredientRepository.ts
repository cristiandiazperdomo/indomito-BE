import { injectable } from "inversify";
import { IIngredientRepository } from "../../../core/domain/interfaces/IIngredientRepository";
import { PagingDto } from "../../../core/dto/paging/PagingDto";
import { DtoResponsePaging } from "../../../core/dto/paging/DtoResponsePaging";
import {
  Ingredient,
  IngredientAttributes,
} from "../../../core/domain/models/Ingredient";
import { NotFoundException } from "../../../core/exceptions/NotFoundException";
import { ElementAlreadyExistsException } from "../../../core/exceptions/ElementAlreadyExistsException";
import { UniqueConstraintError } from "sequelize";
import { CreateIngredientDto } from "../../../core/dto/entities/Ingredients/CreateIngredientDto";
import { prepareFilterFindAll } from "./prepareFilterFindAll";
import { FindAllIngredientsFilterDto } from "../../../core/dto/entities/Ingredients/FindAllIngredientsFilterDto";

@injectable()
export class IngredientRepository implements IIngredientRepository {
  public async findAll(
    filterDto: FindAllIngredientsFilterDto,
    pagingDto: PagingDto
  ): Promise<DtoResponsePaging<IngredientAttributes>> {
    const dtoResponsePaging: DtoResponsePaging<IngredientAttributes> =
      new DtoResponsePaging();

    const filterWithPaging = prepareFilterFindAll(filterDto, pagingDto);
    const filterWithoutPaging = { where: filterWithPaging.where };

    dtoResponsePaging.count = await Ingredient.count(filterWithoutPaging);
    dtoResponsePaging.items = await Ingredient.findAll(filterWithPaging);

    return dtoResponsePaging;
  }

  public async findById(id: string): Promise<Ingredient> {
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) throw new NotFoundException("Ingredient not found");
    return ingredient;
  }

  public async create(data: CreateIngredientDto): Promise<Ingredient> {
    try {
      return await Ingredient.create(data);
    } catch (error: any) {
      if (error instanceof UniqueConstraintError) {
        throw new ElementAlreadyExistsException("Ingredient already exist");
      }
      throw error;
    }
  }

  public async update(
    id: string,
    data: IngredientAttributes
  ): Promise<Ingredient> {
    const found = await Ingredient.findByPk(id);
    if (!found) throw new NotFoundException("Ingredient not found");
    await found.update(data);
    return found;
  }

  public async delete(id: string): Promise<void> {
    const found = await Ingredient.findByPk(id);
    if (!found) throw new NotFoundException("Ingredient not found");
    await found.destroy();
  }
}
