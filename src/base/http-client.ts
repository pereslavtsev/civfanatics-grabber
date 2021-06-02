import axios, { AxiosResponse } from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';
import { BASE_URL } from '../consts';

export type HttpResponse = AxiosResponse & { $: CheerioAPI };

const httpClient = axios.create({
  baseURL: BASE_URL,
});

if (typeof window === 'undefined') {
  httpClient.defaults.headers = {
    'User-Agent': `CivFanatics Grabber ${process.env.npm_package_version}`,
  };
}

httpClient.interceptors.response.use((res: HttpResponse) => {
  res.$ = cheerio.load(res.data);
  return res;
});

export default httpClient;
