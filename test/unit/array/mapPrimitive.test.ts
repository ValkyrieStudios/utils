import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import mapPrimitive from '../../../lib/array/mapPrimitive';
import {isString} from '../../../lib/string/is';

describe('Array - mapPrimitive', () => {
    it('Returns an empty object when passing nothing', () => {
        // @ts-ignore
        expect(mapPrimitive()).toEqual({});
    });

    it('Return an empty object if passed a non-array or empty array as value', () => {
        for (const el of CONSTANTS.NOT_ARRAY_WITH_EMPTY) {
            // @ts-ignore
            expect(mapPrimitive(el, 'uid')).toEqual({});
        }
    });

    it('Should correctly map a numeric primitive array', () => {
        expect(mapPrimitive([1, 4, 5, 8, 4023])).toEqual({
            1: 1,
            4: 4,
            5: 5,
            8: 8,
            4023: 4023,
        });
    });

    it('Should correctly map a numeric primitive array, when passing a non-object options', () => {
        for (const el of CONSTANTS.NOT_OBJECT_WITH_EMPTY) {
            expect(mapPrimitive([1, 4, 5, 8, 4023], el)).toEqual({
                1: 1,
                4: 4,
                5: 5,
                8: 8,
                4023: 4023,
            });
        }
    });

    it('Should correctly map a numeric primitive array and not autoround by default', () => {
        expect(mapPrimitive([1, 4, 5, 5.4, 8, 4023])).toEqual({
            1: 1,
            4: 4,
            5: 5,
            5.4: 5.4,
            8: 8,
            4023: 4023,
        });
    });

    it('Should correctly map a numeric primitive array and autoround if asked', () => {
        expect(mapPrimitive([1, 4, 4.1, 5, 5.4, 8, 8.6, 4023], {keyround: true})).toEqual({
            1: 1,
            4: 4.1,
            5: 5.4,
            8: 8,
            9: 8.6,
            4023: 4023,
        });
    });

    it('Should correctly map a numeric primitive array and valround if asked', () => {
        expect(mapPrimitive([1, 4, 4.1, 5, 5.4, 8, 8.6, 4023], {valround: true})).toEqual({
            1: 1,
            4: 4,
            4.1: 4,
            5: 5,
            5.4: 5,
            8: 8,
            8.6: 9,
            4023: 4023,
        });
    });

    it('Should correctly map a numeric primitive array and valround and keyround if asked', () => {
        expect(mapPrimitive([1, 4, 4.1, 5, 5.4, 8, 8.6, 4023], {valround: true, keyround: true})).toEqual({
            1: 1,
            4: 4,
            5: 5,
            8: 8,
            9: 9,
            4023: 4023,
        });
    });

    it('Should correctly map a numeric primitive array and valround to precision and keyround if asked', () => {
        expect(mapPrimitive([1.2345, 4, 4.198, 5, 5.409, 8, 8.6, 4023], {valround: 2, keyround: true})).toEqual({
            1: 1.23,
            4: 4.2,
            5: 5.41,
            8: 8,
            9: 8.6,
            4023: 4023,
        });
    });

    it('Should correctly map a string primitive array', () => {
        expect(mapPrimitive(['hello', 'foo', 'bar'])).toEqual({
            hello: 'hello',
            foo: 'foo',
            bar: 'bar',
        });
    });

    it('Should correctly map a string primitive array and remove strings that would be empty or empty after trimming', () => {
        expect(mapPrimitive(['hello', 'foo', ' ', '', 'bar', '    '])).toEqual({
            hello: 'hello',
            foo: 'foo',
            bar: 'bar',
        });
    });

    it('Should automatically trim strings for key storage when mapping a string primitive array', () => {
        expect(mapPrimitive(['  hello   ', ' foo', 'bar'])).toEqual({
            hello: '  hello   ',
            foo: ' foo',
            bar: 'bar',
        });
    });

    it('Should automatically trim strings for key storage and dedupe when mapping a string primitive array', () => {
        expect(mapPrimitive(['  hello   ', 'hello  ', ' foo', 'bar'])).toEqual({
            foo: ' foo',
            bar: 'bar',
            hello: 'hello  ',
        });
    });

    it('Should allow turning on value trimming and dedupe when mapping a string primitive array', () => {
        expect(mapPrimitive(['  hello   ', 'hello  ', ' foo', 'bar'], {valtrim: true})).toEqual({
            hello: 'hello',
            foo: 'foo',
            bar: 'bar',
        });
    });

    it('Should automatically remove anything that isn\'t a string or number', () => {
        expect(mapPrimitive(['  hello   ', 'hello  ', {a: 1}, new Date(), new RegExp('w'), 10, ' foo', 'bar'], {valtrim: true})).toEqual({
            hello: 'hello',
            foo: 'foo',
            bar: 'bar',
            10: 10,
        });
    });

    it('Should automatically remove anything that does not match my filter function', () => {
        expect(
            mapPrimitive(['  hello   ', 'hello  ', {a: 1}, new Date(), new RegExp('w'), 10, ' foo', 'bar'], {
                valtrim: true,
                filter_fn: isString,
            })
        ).toEqual({
            hello: 'hello',
            foo: 'foo',
            bar: 'bar',
        });
    });
});
