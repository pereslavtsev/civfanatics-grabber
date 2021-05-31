import { DownloadsManager } from './managers/downloads.manager';

export class CivFanaticsApi {
  get downloads(): DownloadsManager {
    return new DownloadsManager();
  }
}
