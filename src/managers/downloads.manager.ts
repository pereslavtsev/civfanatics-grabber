import debug from 'debug';
import { DateTime } from 'luxon';
import httpClient, { HttpResponse } from '../base/http-client';
import { Author, Category, Resource } from '../models';
import { parseLink, parseRating, parseReleaseDateTime } from '../helpers';
import { Version } from '../models/version.model';

/**
 * Downloads Manager
 */
export class DownloadsManager {
  protected readonly http = httpClient;
  protected readonly debug = debug('downloads');

  async getResource(url: string): Promise<Resource>;
  async getResource(id: number): Promise<Resource>;
  async getResource(id: number | string): Promise<Resource> {
    this.debug('get resource: %d', id);
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
    const [authorId, authorName] = parseLink(authorLink);
    const author = new Author(authorId, authorName);
    this.debug('author obj: %o', author);
    resource.author = author;

    // parse the category
    const categoryLink = resourceInfoSection.find('.resourceCategory dd a');
    const [categoryId, categoryTitle] = parseLink(categoryLink);
    const category = new Category(categoryId, categoryTitle);
    this.debug('category obj: %o', category);
    resource.category = category;

    // parse total download count
    const downloadCount = resourceInfoSection.find('.downloadCount dd').text();
    this.debug('download count: %d', downloadCount);
    resource.downloadCount = parseInt(downloadCount); // should be integer

    // parse the first release date
    const firstRelease = parseReleaseDateTime(
      resourceInfoSection.find('.firstRelease dd .DateTime')
    );
    this.debug('first release date: %s', firstRelease);
    resource.firstRelease = DateTime.fromFormat(firstRelease, 'ff').toJSDate();

    const lastUpdate = parseReleaseDateTime(
      resourceInfoSection.find('.lastUpdate dd .DateTime')
    );
    this.debug('last update date: %s', lastUpdate);
    resource.lastUpdate = DateTime.fromFormat(lastUpdate, 'ff').toJSDate();

    const descriptionHtml = $('.innerContent .baseHtml').html();
    this.debug('description html: %s', descriptionHtml);
    resource.descriptionHtml = descriptionHtml;

    const rating = parseRating(resourceInfoSection.find('.rating dd'));
    this.debug('rating obj: %o', rating);
    resource.rating = rating;

    // 3. Get latest version info
    const [, versionId] = $('.downloadButton a')
      .attr('href')
      .match(/version=(\d+)$/);
    const latestVersion = new Version(parseInt(versionId));
    const latestVersionInfoSection = $('#versionInfo');

    // parse the latest version release date
    const versionDateTime = parseReleaseDateTime(
      latestVersionInfoSection.find('.versionReleaseDate dd .DateTime')
    );
    this.debug('version released: %s', versionDateTime);
    latestVersion.releasedAt = DateTime.fromFormat(
      versionDateTime,
      'ff'
    ).toJSDate();

    // parse the latest version name
    const versionName = latestVersionInfoSection
      .find('h3')
      .text()
      .replace(/Version /, '');
    this.debug('version name: %s', versionName);
    latestVersion.name = versionName;

    // parse the latest version download count
    const versionDownloadCount = latestVersionInfoSection
      .find('.versionDownloadCount dd')
      .text();
    this.debug('version download count: %d', versionDownloadCount);
    latestVersion.downloadCount = parseInt(versionDownloadCount); // should be integer

    const versionRating = parseRating(
      latestVersionInfoSection.find('.rating dd')
    );
    this.debug('version rating obj: %o', versionRating);
    latestVersion.rating = versionRating;

    this.debug('latest version obj: %o', latestVersion);
    resource.latestVersion = latestVersion;

    this.debug('resource: %O', resource);
    return resource;
  }

  async getResourceHistory(url: string): Promise<Version[]>;
  async getResourceHistory(id: number): Promise<Version[]>;
  async getResourceHistory(id: number | string): Promise<Version[]> {
    this.debug('get resource history: %d', id);
    const resource = new Resource(id);
    const { $ } = await this.http.get<unknown, HttpResponse>(
      `/resources/${resource.id}/history`
    );
    const rows = $('.resourceHistory tr:not(:eq(0))').map((i, el) => {
      this.debug('row: %s', $(el).html());
    });
    return [];
  }
}
