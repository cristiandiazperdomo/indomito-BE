import { ConflictException } from "../../../core/exceptions/ConflictException";
import { ElementAlreadyExistsException } from "../../../core/exceptions/ElementAlreadyExistsException";
import { InvalidDataException } from "../../../core/exceptions/InvalidDataException";
import { NotAuthorizedException } from "../../../core/exceptions/NotAuthorizedException";
import { NotFoundException } from "../../../core/exceptions/NotFoundException";

class HttpError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function getHttpStatusCode(error: Error): number {
  if (error instanceof NotFoundException) {
    return 404;
  } else if (error instanceof InvalidDataException) {
    return 400;
  } else if (
    error instanceof ConflictException ||
    error instanceof ElementAlreadyExistsException
  ) {
    return 409;
  } else if (error instanceof NotAuthorizedException) {
    return 403;
  } else {
    return 500;
  }
}
