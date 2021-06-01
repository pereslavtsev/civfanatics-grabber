import axios, { AxiosResponse } from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';
import { BASE_URL } from '../consts';

export type HttpResponse = AxiosResponse & { $: CheerioAPI };

const httpClient = axios.create({
  baseURL: BASE_URL,
});

httpClient.interceptors.response.use((res: HttpResponse) => {
  res.$ = cheerio.load(res.data);
  return res;
});

export default httpClient;
