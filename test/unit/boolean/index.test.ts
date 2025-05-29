import {describe, it, expect} from 'vitest';
import * as LibBoolean from '../../../lib/boolean';
import is from '../../../lib/boolean/is';

describe('Boolean - *', () => {
    it('Should be a correct export', () => {
        expect(LibBoolean.isBoolean).toEqual(is);
    });
});
