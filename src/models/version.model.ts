import { Base } from './base.model';
import { ResourceRating } from './resource.model';

export class Version extends Base {
  public name: string;
  public downloadCount = 0;
  public releasedAt;
  public rating: ResourceRating;
}
