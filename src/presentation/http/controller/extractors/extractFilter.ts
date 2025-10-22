import { Request } from "express";

export async function extractFilter<T>(req: Request): Promise<T> {
  const { name } = req.query as { name: string };

  const filter: T = {
    name: name,
  } as T;

  return filter;
}
