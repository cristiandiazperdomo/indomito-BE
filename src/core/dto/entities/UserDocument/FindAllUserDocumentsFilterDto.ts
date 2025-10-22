export class FindAllUserDocumentsFilterDto {
  userId?: string;

  constructor(data: { userId?: string }) {
    this.userId = data.userId;
  }
}
