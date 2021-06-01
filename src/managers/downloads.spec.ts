import { createGetResourceSuite } from '../../test/helpers';

describe('Downloads', () => {
  describe('Get resource by id', createGetResourceSuite(28688));
  describe(
    'Get resource by name',
    createGetResourceSuite('abimelech-of-the-philistines.28688')
  );
  describe(
    'Get resource by full url',
    createGetResourceSuite(
      '  https://forums.civfanatics.com/resources/abimelech-of-the-philistines.28688/'
    )
  );
});
