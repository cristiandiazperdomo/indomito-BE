export class NotAuthorizedException extends Error {
  constructor(message: string) {
    super(message);
  }
}
