import { createGetResourceSuite } from '../../test/helpers';
import { Version } from '../models/version.model';
import api from '../index';
import { BASE_URL } from '../consts';

describe('downloads', () => {
  describe('get resource by id', () => createGetResourceSuite(28688)());

  describe('get resource by name', () =>
    createGetResourceSuite('abimelech-of-the-philistines.28688')());

  describe('get resource by full url', () =>
    createGetResourceSuite(
      `  ${BASE_URL}/resources/abimelech-of-the-philistines.28688/`
    )());

  describe('get resource history by id', () => {
    let versions: Version[];

    beforeAll(async () => {
      versions = await api.downloads.getResourceHistory(28688);
    });

    it('versions history should be an array', () => {
      expect.hasAssertions();
      expect(Array.isArray(versions)).toBe(true);
    });

    it(`versions history length should be greater or equal than 1`, () => {
      expect.hasAssertions();
      expect(versions.length).toBeGreaterThanOrEqual(1);
    });
  });
});
