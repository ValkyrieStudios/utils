import {describe, it, expect} from 'vitest';
import * as LibFormData from '../../../lib/formdata';
import is from '../../../lib/formdata/is';
import toObject from '../../../lib/formdata/toObject';

describe('FormData - *', () => {
    it('Should be a correct export', () => {
        expect(LibFormData.isFormData).toEqual(is);
        expect(LibFormData.toObject).toEqual(toObject);
    });
});
