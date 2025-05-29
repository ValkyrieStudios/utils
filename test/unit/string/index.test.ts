import {describe, it, expect} from 'vitest';
import * as LibString from '../../../lib/string';
import is from '../../../lib/string/is';
import isNotEmpty from '../../../lib/string/isNotEmpty';
import isBetween from '../../../lib/string/isBetween';
import humanizeBytes from '../../../lib/string/humanizeBytes';
import humanizeNumber from '../../../lib/string/humanizeNumber';
import shorten from '../../../lib/string/shorten';

describe('String - *', () => {
    it('Should be a correct export', () => {
        expect(LibString.isString).toEqual(is);
        expect(LibString.isNeString).toEqual(isNotEmpty);
        expect(LibString.isNotEmptyString).toEqual(isNotEmpty);
        expect(LibString.isStringBetween).toEqual(isBetween);
        expect(LibString.humanizeBytes).toEqual(humanizeBytes);
        expect(LibString.humanizeNumber).toEqual(humanizeNumber);
        expect(LibString.shorten).toEqual(shorten);
    });
});
