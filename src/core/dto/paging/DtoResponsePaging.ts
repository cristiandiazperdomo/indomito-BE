export class DtoResponsePaging<T> {
  count: number = 0;
  items!: T[];
}
