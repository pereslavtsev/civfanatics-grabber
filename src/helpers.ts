import { Cheerio } from 'cheerio';
import { ResourceRating } from './models';

export const parseReleaseDateTime = (el: Cheerio<any>): string => {
  return el.attr('title').replace(/ at/, ',');
};

export const parseLink = (el: Cheerio<any>): [number, string] => {
  const text = el.text();
  const [, id] = el.attr('href').match(/(\d+)\/?$/);
  return [parseInt(id), text];
};

export const parseRating = (el: Cheerio<any>): ResourceRating => {
  const average = el.find('.RatingValue [itemprop=average]').text();
  const best = el.find('.RatingValue [itemprop=best]').text();
  const value = el.find('.ratings').attr('title');

  const [count] = el
    .find('.Hint')
    .text()
    .match(/^(\d+)*/);

  return {
    average: parseFloat(average),
    best: parseInt(best),
    value: parseFloat(value),
    count: parseInt(count),
  };
};
