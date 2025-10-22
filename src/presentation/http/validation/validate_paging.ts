import type { Request } from "express";
import { InvalidDataException } from "../../../core/exceptions/InvalidDataException";

export async function validatePagingQueryParams(req: Request) {
  const { limit, offset } = req.query;
  if (!limit || !offset || isNaN(Number(limit)) || isNaN(Number(offset))) {
    throw new InvalidDataException(
      "Los parámetros 'limit' y 'offset' son obligatorios y deben ser números."
    );
  }
  req.query.limit = limit;
  req.query.offset = offset;
}
