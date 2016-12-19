import {expect} from 'chai';
import compareKeys from 'lib/utils/compare-keys';

describe('compare-keys', () => {
  describe('compare one key', () => {
    it('should return true if key is different', () => {
      const obj1 = {val: 1};
      const obj2 = {val: 2};
      const props = 'val';
      expect(compareKeys(obj1, obj2, props)).to.be.true;
    });

    it('should return false if key is different', () => {
      const obj1 = {val: 1};
      const obj2 = {val: 1};
      const props = 'val';
      expect(compareKeys(obj1, obj2, props)).to.be.false;
    });

    it('should ignore other keys and only compare the given one', () => {
      const obj1 = {val: 1, different: false};
      const obj2 = {val: 1, different: true};
      const props = 'val';
      expect(compareKeys(obj1, obj2, props)).to.be.false;
    });
  });

  describe('compare multiple keys', () => {
    it('should return true if any one of the keys are different', () => {
      const obj1 = {val: 1, val2: 2};
      const obj2 = {val: 2, val2: 2};
      const props = ['val', 'val2'];
      expect(compareKeys(obj1, obj2, props)).to.be.true;
    });

    it('should return false if all the values the same', () => {
      const obj1 = {val: 2, val2: 2};
      const obj2 = {val: 2, val2: 2};
      const props = ['val', 'val2'];
      expect(compareKeys(obj1, obj2, props)).to.be.false;
    });

    it('should ignore other keys and only compare the given ones', () => {
      const obj1 = {val: 2, val2: 2, val3: 5};
      const obj2 = {val: 2, val2: 2, val3: 1};
      const props = ['val', 'val2'];
      expect(compareKeys(obj1, obj2, props)).to.be.false;
    });
  });
});
