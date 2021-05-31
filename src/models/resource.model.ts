import { Category } from './category.model';
import { Base } from './base.model';
import { Author } from './author.model';

type ResourceRating = {
  value: number;
  count: number;
};

export class Resource extends Base {
  public readonly id!: number;

  constructor(id: number | string) {
    super();
    switch (typeof id) {
      case 'number':
        this.id = id;
        break;
      case 'string': {
        if (id.match(/^\d+$/)?.length) {
          this.id = parseInt(id);
          break;
        }
        const [, resourceId] = id.match(/(\d+)\/?$/);
        this.id = parseInt(resourceId);
        break;
      }
    }
  }

  public title: string;
  public image: string;
  public tagLine: string;

  // Information
  public author: Author;
  public downloadCount = 0;
  public firstRelease: Date;
  public lastUpdate: Date;
  public resourceCategory: Category;
  public rating: ResourceRating;
  public descriptionHtml: string;
}
