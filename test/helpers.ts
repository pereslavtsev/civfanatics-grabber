import api, { Author, Category, Resource } from '../src';

const isValidDate = (d: Date) => d instanceof Date && !isNaN(d.getTime());

export const createGetResourceSuite = (id: string | number) => (): void => {
  let resource: Resource;

  beforeAll(async () => {
    resource = await api.downloads.getResource(String(id));
  });

  describe('Checking the base info', () => {
    it('resource id should be equal with requested', () => {
      expect(
        id === resource.id || String(id).includes(String(resource.id))
      ).toBe(true);
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
  });

  describe('Checking the resource information', () => {
    it('resource author should be instance of the "Author" class', () => {
      expect(resource.author instanceof Author).toBeTruthy();
    });

    it('resource author should be instance of the "Category" class', () => {
      expect(resource.category instanceof Category).toBeTruthy();
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
  });

  describe('Checking the resource rating', () => {
    for (const param of ['average', 'best', 'count', 'value']) {
      it(`resource rating ${param} should be a number`, () => {
        expect(typeof resource.rating[param]).toBe('number');
      });
    }
  });

  describe('Checking the latest version info', () => {
    it('latest version id should be a number', () => {
      expect(typeof resource.latestVersion.id).toBe('number');
    });

    it('latest version name should be a text', () => {
      expect(typeof resource.latestVersion.name).toBe('string');
    });

    it('latest version download count should be a number', () => {
      expect(typeof resource.latestVersion.downloadCount).toBe('number');
    });

    it('latest version release date should be valid', () => {
      expect(isValidDate(resource.latestVersion.releasedAt)).toBeTruthy();
    });
  });

  describe('Checking the latest version rating', () => {
    for (const param of ['average', 'best', 'count', 'value']) {
      it(`latest version rating ${param} should be a number`, () => {
        expect(typeof resource.latestVersion.rating[param]).toBe('number');
      });
    }
  });
};
