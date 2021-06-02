import { Version } from '../models/version.model';
import api from '../index';
import { isValidDate } from '../../test/helpers';

describe('downloads.getResourceHistory', () => {
  let versions: Version[];

  beforeAll(async () => {
    versions = await api.downloads.getResourceHistory(8170);
  });

  it('versions history should be an array', () => {
    expect.hasAssertions();
    expect(Array.isArray(versions)).toBe(true);
  });

  it(`versions history length should be greater or equal than 1`, () => {
    expect.hasAssertions();
    expect(versions.length).toBeGreaterThanOrEqual(1);
  });

  it('version id should be a number', () => {
    expect.hasAssertions();
    versions.forEach((version) => {
      expect(typeof version.id).toBe('number');
    });
  });

  it('version download count should be a number', () => {
    expect.hasAssertions();
    versions.forEach((version) => {
      expect(typeof version.downloadCount).toBe('number');
    });
  });

  it('version name should be a string', () => {
    expect.hasAssertions();
    versions.forEach((version) => {
      expect(typeof version.name).toBe('string');
    });
  });

  it('version release date should be a valid date', () => {
    expect.hasAssertions();
    versions.forEach((version) => {
      expect(isValidDate(version.releasedAt)).toBeTruthy();
    });
  });

  it('checking versions ratings', () => {
    expect.hasAssertions();
    versions.forEach((version) => {
      for (const param of ['average', 'best', 'count', 'value']) {
        expect.hasAssertions();
        expect(typeof version.rating[param]).toBe('number');
      }
    });
  });
});
