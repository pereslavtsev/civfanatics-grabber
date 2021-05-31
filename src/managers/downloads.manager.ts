import debug from 'debug';
import { DateTime } from 'luxon';
import httpClient, { HttpResponse } from '../base/http-client';
import { Author, Resource } from '../models';

export class DownloadsManager {
  protected readonly http = httpClient;
  protected readonly debug = debug('downloads');

  async getResource(id: number | string): Promise<Resource> {
    this.debug('get resource: %d', id);
    try {
      const resource = new Resource(id);
      const { $ } = await this.http.get<unknown, HttpResponse>(
        `/resources/${resource.id}`
      );

      // 1. Get resource base info
      // parse the resource title
      // get text without children items: https://stackoverflow.com/a/8851526
      const title = $('.resourceInfo h1')
        .clone()
        .children()
        .remove()
        .end()
        .text();
      this.debug('title: %s', title);
      resource.title = title;

      // parse the resource image
      const image = $('.resourceInfo img').attr('src');
      this.debug('image: %s', image);
      resource.image = image;

      // parse the tag line
      const tagLine = $('.resourceInfo .tagLine').text();
      this.debug('tag line: %s', tagLine);
      resource.tagLine = tagLine;

      // 2. Get another data
      // parse the author
      const resourceInfoSection = $('#resourceInfo');
      const authorLink = resourceInfoSection.find('.author dd a');
      const authorName = authorLink.text();
      const [, authorId] = authorLink.attr('href').match(/(\d+)\/?$/);
      const author = new Author(parseInt(authorId), authorName);
      this.debug('author obj: %o', author);
      resource.author = author;

      // parse total download count
      const downloadCount = resourceInfoSection
        .find('.downloadCount dd')
        .text();
      this.debug('get resource: %d', downloadCount);
      resource.downloadCount = parseInt(downloadCount); // should be integer

      // parse the first release date
      const firstRelease = resourceInfoSection
        .find('.firstRelease dd .DateTime')
        .attr('title')
        .replace(/ at/, ',');
      this.debug('first release date: %s', firstRelease);
      resource.firstRelease = DateTime.fromFormat(
        firstRelease,
        'ff'
      ).toJSDate();

      const lastUpdate = resourceInfoSection
        .find('.lastUpdate dd .DateTime')
        .attr('title')
        .replace(/ at/, ',');
      this.debug('last update date: %s', lastUpdate);
      resource.lastUpdate = DateTime.fromFormat(lastUpdate, 'ff').toJSDate();

      const descriptionHtml = $('.innerContent .baseHtml').html();
      this.debug('description html: %s', descriptionHtml);
      resource.descriptionHtml = descriptionHtml;

      this.debug('resource: %O', resource);
      return resource;
    } catch (e) {
      this.debug('error', e);
    }
  }
}
