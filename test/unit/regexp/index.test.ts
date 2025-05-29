import {describe, it, expect} from 'vitest';
import * as LibRegExp from '../../../lib/regexp';
import is from '../../../lib/regexp/is';
import sanitize from '../../../lib/regexp/sanitize';

describe('RegExp - *', () => {
    it('Should be a correct export', () => {
        expect(LibRegExp.isRegExp).toEqual(is);
        expect(LibRegExp.sanitizeRegExp).toEqual(sanitize);
        expect(LibRegExp.sanitize).toEqual(sanitize);
    });
});
