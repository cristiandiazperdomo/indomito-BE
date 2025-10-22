import { Op } from "sequelize";
import { PagingDto } from "../../../core/dto/paging/PagingDto";
import { FindAllProductsFilterDto } from "../../../core/dto/entities/Product/FindAllProductsFilterDto";
import { Category } from "../../../core/domain/models/Category";
import { Ingredient } from "../../../core/domain/models/Ingredient";

export function prepareFilterFindAll(
  filterDto: FindAllProductsFilterDto,
  pagingDto: PagingDto
) {
  const filter = {
    offset: pagingDto.offset,
    limit: pagingDto.limit,
    where: {},
    include: [
      { model: Category, as: "categories", through: { attributes: [] } },
      { model: Ingredient, as: "ingredients", through: { attributes: [] } },
    ],
  };

  const where: { [key: string]: any } = {};

  if (filterDto.name) {
    where.name = { [Op.like]: `%${filterDto.name}` };
  }

  filter.where = where;

  return filter;
}
