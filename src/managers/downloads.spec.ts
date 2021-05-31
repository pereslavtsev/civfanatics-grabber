import { createGetResourceSuite } from '../../test/helpers';

describe('Downloads', () => {
  describe('get resource by id', createGetResourceSuite(28688));
  describe(
    'get resource by name',
    createGetResourceSuite('abimelech-of-the-philistines.28688')
  );
  describe(
    'get resource by incorrect url',
    createGetResourceSuite(
      '  https://forums.civfanatics.com/resources/abimelech-of-the-philistines.28688/'
    )
  );
});
