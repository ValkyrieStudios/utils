import {describe, it, expect} from 'vitest';
import * as LibDate from '../../../lib/date';
import is from '../../../lib/date/is';
import isDateFormat from '../../../lib/date/isFormat';
import isLeap from '../../../lib/date/isLeap';
import addUTC from '../../../lib/date/addUTC';
import convertToDate from '../../../lib/date/convertToDate';
import diff from '../../../lib/date/diff';
import endOfUTC from '../../../lib/date/endOfUTC';
import format from '../../../lib/date/format';
import nowUnix from '../../../lib/date/nowUnix';
import nowUnixMs from '../../../lib/date/nowUnixMs';
import setTimeUTC from '../../../lib/date/setTimeUTC';
import startOfUTC from '../../../lib/date/startOfUTC';
import toUnix from '../../../lib/date/toUnix';
import toUTC from '../../../lib/date/toUTC';

describe('Date - *', () => {
    it('Should be a correct export', () => {
        expect(LibDate.isDate).toEqual(is);
        expect(LibDate.isDateFormat).toEqual(isDateFormat);
        expect(LibDate.isFormat).toEqual(isDateFormat);
        expect(LibDate.isLeap).toEqual(isLeap);
        expect(LibDate.addUTC).toEqual(addUTC);
        expect(LibDate.convertToDate).toEqual(convertToDate);
        expect(LibDate.diff).toEqual(diff);
        expect(LibDate.endOfUTC).toEqual(endOfUTC);
        expect(LibDate.format).toEqual(format);
        expect(LibDate.nowUnix).toEqual(nowUnix);
        expect(LibDate.nowUnixMs).toEqual(nowUnixMs);
        expect(LibDate.setTimeUTC).toEqual(setTimeUTC);
        expect(LibDate.startOfUTC).toEqual(startOfUTC);
        expect(LibDate.toUnix).toEqual(toUnix);
        expect(LibDate.toUTC).toEqual(toUTC);
    });
});
