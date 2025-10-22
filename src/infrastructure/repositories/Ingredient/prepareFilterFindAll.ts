import { Op } from "sequelize";
import { PagingDto } from "../../../core/dto/paging/PagingDto";
import { FindAllIngredientsFilterDto } from "../../../core/dto/entities/Ingredients/FindAllIngredientsFilterDto";

export function prepareFilterFindAll(
  filterDto: FindAllIngredientsFilterDto,
  pagingDto: PagingDto
) {
  const filter: any = {
    offset: pagingDto.offset,
    limit: pagingDto.limit,
    where: {},
  };

  const where: { [key: string]: any } = {};

  if (filterDto.name) {
    where.name = { [Op.like]: `%${filterDto.name}%` };
  }

  filter.where = where;

  return filter;
}
