import { Base } from './base.model';

export class Author extends Base {
  public readonly name: string;

  constructor(id: number, name: string) {
    super(id);
    this.name = name;
  }
}
