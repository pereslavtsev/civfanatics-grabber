import { Category } from './category.model';
import { Base } from './base.model';
import { Author } from './author.model';
import { Version } from './version.model';
import { BASE_URL } from '../consts';

export type ResourceRating = {
  value: number;
  count: number;
  best: number;
  average: number;
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
  public category: Category;
  public downloadCount = 0;
  public firstRelease: Date;
  public lastUpdate: Date;
  public rating: ResourceRating;
  public descriptionHtml: string;
  public latestVersion: Version;

  /**
   * Build download url
   * @param version
   */
  downloadUrl(version?: number): string {
    return `${BASE_URL}/resources/${this.id}/download?version=${
      version ?? this.latestVersion.id
    }`;
  }
}
