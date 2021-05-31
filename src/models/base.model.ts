export abstract class Base {
  public readonly id!: number;

  constructor(id?: number) {
    if (id) {
      this.id = id;
    }
  }
}
