import { Request } from "express";
import { PagingDto } from "../../../../core/dto/paging/PagingDto";

export async function extractPaging(req: Request): Promise<PagingDto> {
  const { limit, offset } = req.query as unknown as PagingDto;

  const paging: PagingDto = { limit, offset };

  return paging;
}
