import { Op } from "sequelize";
import { PagingDto } from "../../../core/dto/paging/PagingDto";
import { FindAllProductsFilterDto } from "../../../core/dto/entities/Product/FindAllProductsFilterDto";

export function prepareFilterFindAll(
  filterDto: FindAllProductsFilterDto,
  pagingDto: PagingDto
) {
  const filter = {
    offset: pagingDto.offset,
    limit: pagingDto.limit,
    where: {},
  };

  const where: { [key: string]: any } = {};

  if (filterDto.name) {
    where.name = { [Op.like]: `%${filterDto.name}` };
  }

  filter.where = where;

  return filter;
}
