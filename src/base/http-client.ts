import axios, {AxiosResponse} from "axios";
import cheerio, {CheerioAPI} from 'cheerio';

export type HttpResponse = AxiosResponse & { $: CheerioAPI };

const httpClient = axios.create({
  baseURL: 'https://forums.civfanatics.com/',
});

httpClient.interceptors.response.use((res: HttpResponse) => {
  res.$ = cheerio.load(res.data);
  return res;
})

export default httpClient;
