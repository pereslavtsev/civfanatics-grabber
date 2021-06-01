import { Base } from './base.model';

export class Category extends Base {
  public title: string;

  constructor(id: number, title: string) {
    super(id);
    this.title = title;
  }
}
