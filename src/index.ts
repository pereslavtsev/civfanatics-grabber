import axios, {AxiosInstance} from "axios";
import {CheerioAPI} from "cheerio";
import {HttpResponse} from "./base/http-client";

class Resource {
  protected readonly _http: AxiosInstance;
  protected readonly _id: number;

  get updates() {
    return 1;
  }

  get downloadUrl(): string {
    return '';
  }
}


class DownloadsManager {
  protected readonly http: AxiosInstance;

  async getResource(id: number) {
    const {$} = await this.http.get<unknown, HttpResponse>('');
    $('').find('')
  }
}
