import { createGetResourceSuite } from '../../test/helpers';
import { BASE_URL } from '../consts';

describe('downloads.getResource', () => {
  describe('get resource by id', () => createGetResourceSuite(28688)());

  describe('get resource by name', () =>
    createGetResourceSuite('abimelech-of-the-philistines.28688')());

  describe('get resource by full url', () =>
    createGetResourceSuite(
      `  ${BASE_URL}/resources/abimelech-of-the-philistines.28688/`
    )());
});
