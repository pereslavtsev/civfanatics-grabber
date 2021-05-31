import api, { Author, Resource } from '../src';

const isValidDate = (d: Date) => d instanceof Date && !isNaN(d.getTime());

export const createGetResourceSuite = (id: string | number) => (): void => {
  let resource: Resource;

  beforeAll(async () => {
    resource = await api.downloads.getResource(id);
  });

  it('resource id should be equal with requested', () => {
    expect(id === resource.id || String(id).includes(String(resource.id))).toBe(
      true
    );
  });

  it('resource title should be string', () => {
    expect(typeof resource.title).toEqual('string');
  });

  it('resource image should be defined', () => {
    expect(typeof resource.image).toBeDefined();
  });

  it('resource tag line should be defined', () => {
    expect(typeof resource.tagLine).toBeDefined();
  });

  it('resource description should be string', () => {
    expect(typeof resource.descriptionHtml).toEqual('string');
  });

  // Checking a resource information

  it('resource author should be instance of the "Author" class', () => {
    expect(resource.author instanceof Author).toBeTruthy();
  });

  it('downloads count should be a integer', () => {
    expect(typeof resource.downloadCount).toBe('number');
  });

  it('resource first release date should be valid', () => {
    expect(isValidDate(resource.firstRelease)).toBeTruthy();
  });

  it('resource last update date should be valid', () => {
    expect(isValidDate(resource.lastUpdate)).toBeTruthy();
  });
};
