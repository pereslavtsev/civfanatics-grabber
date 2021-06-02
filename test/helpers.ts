import api, { Author, Category, Resource } from '../src';

// eslint-disable-next-line jest/no-export
export const isValidDate = (d: Date) =>
  d instanceof Date && !isNaN(d.getTime());

// eslint-disable-next-line jest/no-export
export const createGetResourceSuite = (id: string | number) => (): void => {
  let resource: Resource;

  // eslint-disable-next-line jest/require-top-level-describe
  beforeAll(async () => {
    resource = await api.downloads.getResource(String(id));
  });

  describe('checking the base info', () => {
    it('resource id should be equal with requested', () => {
      expect.hasAssertions();
      expect(
        id === resource.id || String(id).includes(String(resource.id))
      ).toBe(true);
    });

    it('resource title should be string', () => {
      expect.hasAssertions();
      expect(typeof resource.title).toBe('string');
    });

    it('resource image should be defined', () => {
      expect.hasAssertions();
      expect(typeof resource.image).toBeDefined();
    });

    it('resource tag line should be defined', () => {
      expect.hasAssertions();
      expect(typeof resource.tagLine).toBeDefined();
    });

    it('resource description should be string', () => {
      expect.hasAssertions();
      expect(typeof resource.descriptionHtml).toBe('string');
    });
  });

  describe('checking the resource information', () => {
    it('resource author should be instance of the "Author" class', () => {
      expect.hasAssertions();
      expect(resource.author instanceof Author).toBeTruthy();
    });

    it('resource author should be instance of the "Category" class', () => {
      expect.hasAssertions();
      expect(resource.category instanceof Category).toBeTruthy();
    });

    it('downloads count should be a integer', () => {
      expect.hasAssertions();
      expect(typeof resource.downloadCount).toBe('number');
    });

    it('resource first release date should be valid', () => {
      expect.hasAssertions();
      expect(isValidDate(resource.firstRelease)).toBeTruthy();
    });

    it('resource last update date should be valid', () => {
      expect.hasAssertions();
      expect(isValidDate(resource.lastUpdate)).toBeTruthy();
    });
  });

  describe('checking the resource rating', () => {
    for (const param of ['average', 'best', 'count', 'value']) {
      it(`resource rating ${param} should be a number`, () => {
        expect.hasAssertions();
        expect(typeof resource.rating[param]).toBe('number');
      });
    }
  });

  describe('checking the latest version info', () => {
    it('latest version id should be a number', () => {
      expect.hasAssertions();
      expect(typeof resource.latestVersion.id).toBe('number');
    });

    it('latest version name should be a text', () => {
      expect.hasAssertions();
      expect(typeof resource.latestVersion.name).toBe('string');
    });

    it('latest version download count should be a number', () => {
      expect.hasAssertions();
      expect(typeof resource.latestVersion.downloadCount).toBe('number');
    });

    it('latest version release date should be valid', () => {
      expect.hasAssertions();
      expect(isValidDate(resource.latestVersion.releasedAt)).toBeTruthy();
    });
  });

  describe('checking the latest version rating', () => {
    for (const param of ['average', 'best', 'count', 'value']) {
      it(`latest version rating ${param} should be a number`, () => {
        expect.hasAssertions();
        expect(typeof resource.latestVersion.rating[param]).toBe('number');
      });
    }
  });
};
