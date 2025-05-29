import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import join from '../../../lib/array/join';

describe('Array - join', () => {
    it('Returns an empty string when passing nothing', () => {
        // @ts-ignore
        expect(join()).toBe('');
    });

    it('Return an empty string if passed a non-array or empty array as value', () => {
        for (const el of CONSTANTS.NOT_ARRAY_WITH_EMPTY) {
            expect(join(el)).toBe('');
        }
    });

    it('Returns an empty string if passed an empty Set', () => {
        expect(join(new Set())).toBe('');
    });

    describe('array', () => {
        it('Returns empty string when passing an array containing no strings or numbers', () => {
            expect(
                join([
                    ...CONSTANTS.IS_BOOLEAN,
                    ...CONSTANTS.IS_REGEXP,
                    ...CONSTANTS.IS_DATE,
                    ...CONSTANTS.IS_ARRAY,
                    ...CONSTANTS.IS_FUNCTION,
                    ...CONSTANTS.IS_OBJECT,
                    ...CONSTANTS.IS_NULLABLE,
                ])
            ).toBe('');
        });

        it('autotrims strings when joining by default', () => {
            const vals = ['   valkyrie ', '   studios  '];
            expect(join(vals)).toBe('valkyrie studios');
        });

        it('filters out trimmed strings when joining by default', () => {
            const vals = ['    ', '   studios  '];
            expect(join(vals)).toBe('studios');
        });

        it('does not autotrims strings when joining if option is turned off', () => {
            const vals = ['   valkyrie ', '   studios  '];
            expect(join(vals, {valtrim: false})).toBe('valkyrie     studios');
        });

        it('does not autotrims strings when joining and after joining if option is turned off', () => {
            const vals = ['   valkyrie ', '   studios  '];
            expect(join(vals, {valtrim: false, trim: false})).toBe('   valkyrie     studios  ');
        });

        it('allows you to override the delimiter with an empty string when joining with trimming turned off', () => {
            const vals = ['   valkyrie ', '   studios  '];
            expect(join(vals, {delim: '', valtrim: false, trim: false})).toBe('   valkyrie    studios  ');
        });

        it('allows you to override the delimiter with an empty string when joining with trimming turned on', () => {
            const vals = ['   valkyrie ', '   studios  '];
            expect(join(vals, {delim: ''})).toBe('valkyriestudios');
        });

        it('allows you to override the delimiter with a different string when joining with trimming turned on', () => {
            const vals = ['   valkyrie ', '   studios  '];
            expect(join(vals, {delim: '@'})).toBe('valkyrie@studios');
        });

        it('allows you to join a mix of numbers and strings', () => {
            const vals = ['   valkyrie ', 569.45, '   studios  '];
            expect(join(vals, {delim: '@'})).toBe('valkyrie@569.45@studios');
        });

        it('allows you to join only numbers', () => {
            const vals = [569.45, 965.12];
            expect(join(vals, {delim: '@', valround: 0})).toBe('569@965');
        });

        it('allows you to turn on innertrim to trim inside of the strings as well', () => {
            const vals = ['   hello     world    ', ' this    is', '   peter   from    valkyrie'];
            expect(join(vals, {delim: ' ', innertrim: true})).toBe('hello world this is peter from valkyrie');
        });

        it('allows you to join a mix of numbers and strings and autoround to a certain precision', () => {
            const vals = ['   valkyrie ', 569.45, '   studios  '];
            expect(join(vals, {delim: '@', valround: 0})).toBe('valkyrie@569@studios');
            expect(join(vals, {delim: '@', valround: 1})).toBe('valkyrie@569.5@studios');
            expect(join(vals, {delim: '@', valround: 2})).toBe('valkyrie@569.45@studios');
            expect(join(vals, {delim: '@', valround: 3})).toBe('valkyrie@569.45@studios');
        });

        it('removes multiple invalid values while joining', () => {
            expect(join([false, false, 'hi', false, false, 'there'], {delim: '|'})).toBe('hi|there');
        });

        it('allows you to dedupe values while joining', () => {
            expect(
                join(['prop_1', 'prop_2', 'prop_1', 'prop_3'], {
                    delim: ',',
                    dedupe: true,
                })
            ).toBe('prop_1,prop_2,prop_3');

            expect(
                join(['prop_1', 'prop_2', 'prop_1', 'prop_3'], {
                    delim: ',',
                    dedupe: false,
                })
            ).toBe('prop_1,prop_2,prop_1,prop_3');
        });

        it('allows you to dedupe after trimming values while joining', () => {
            expect(
                join(['prop_1', 'prop_2', ' prop_1', 'prop_3 ', ' prop_3'], {
                    delim: ',',
                    dedupe: true,
                })
            ).toBe('prop_1,prop_2,prop_3');
        });

        it('allows you to dedupe after rounding values while joining', () => {
            expect(join([58.432, 58.43, 58.421], {delim: '@', dedupe: true, valround: 1})).toBe('58.4');
        });

        it('allows you to dedupe after rounding values while joining and dedupe after stringification', () => {
            expect(join([58.432, 58.43, 58.421, '58', 59.1, '59'], {delim: '@', dedupe: true, valround: 0})).toBe('58@59');
        });
    });

    describe('set', () => {
        it('Returns empty string when passing a set containing no strings or numbers', () => {
            expect(
                join(
                    new Set([
                        ...CONSTANTS.IS_BOOLEAN,
                        ...CONSTANTS.IS_REGEXP,
                        ...CONSTANTS.IS_DATE,
                        ...CONSTANTS.IS_ARRAY,
                        ...CONSTANTS.IS_FUNCTION,
                        ...CONSTANTS.IS_OBJECT,
                        ...CONSTANTS.IS_NULLABLE,
                    ])
                )
            ).toBe('');
        });

        it('autotrims strings when joining by default', () => {
            expect(join(new Set(['   valkyrie ', '   studios  ']))).toBe('valkyrie studios');
        });

        it('filters out trimmed strings when joining by default', () => {
            expect(join(new Set(['    ', '   studios  ']))).toBe('studios');
        });

        it('does not autotrims strings when joining if option is turned off', () => {
            expect(join(new Set(['   valkyrie ', '   studios  ']), {valtrim: false})).toBe('valkyrie     studios');
        });

        it('does not autotrims strings when joining and after joining if option is turned off', () => {
            expect(join(new Set(['   valkyrie ', '   studios  ']), {valtrim: false, trim: false})).toBe('   valkyrie     studios  ');
        });

        it('allows you to override the delimiter with an empty string when joining with trimming turned off', () => {
            // eslint-disable-next-line max-len
            expect(join(new Set(['   valkyrie ', '   studios  ']), {delim: '', valtrim: false, trim: false})).toBe('   valkyrie    studios  ');
        });

        it('allows you to override the delimiter with an empty string when joining with trimming turned on', () => {
            expect(join(new Set(['   valkyrie ', '   studios  ']), {delim: ''})).toBe('valkyriestudios');
        });

        it('allows you to override the delimiter with a different string when joining with trimming turned on', () => {
            expect(join(new Set(['   valkyrie ', '   studios  ']), {delim: '@'})).toBe('valkyrie@studios');
        });

        it('allows you to join a mix of numbers and strings', () => {
            expect(join(new Set(['   valkyrie ', 569.45, '   studios  ']), {delim: '@'})).toBe('valkyrie@569.45@studios');
        });

        it('allows you to join only numbers', () => {
            expect(join(new Set([569.45, 965.12]), {delim: '@', valround: 0})).toBe('569@965');
        });

        it('allows you to turn on innertrim to trim inside of the strings as well', () => {
            expect(
                join(new Set(['   hello     world    ', ' this    is', '   peter   from    valkyrie']), {
                    delim: ' ',
                    innertrim: true,
                })
            ).toBe('hello world this is peter from valkyrie');
        });

        it('allows you to join a mix of numbers and strings and autoround to a certain precision', () => {
            expect(join(new Set(['   valkyrie ', 569.45, '   studios  ']), {delim: '@', valround: 0})).toBe('valkyrie@569@studios');
            expect(join(new Set(['   valkyrie ', 569.45, '   studios  ']), {delim: '@', valround: 1})).toBe('valkyrie@569.5@studios');
            expect(join(new Set(['   valkyrie ', 569.45, '   studios  ']), {delim: '@', valround: 2})).toBe('valkyrie@569.45@studios');
            expect(join(new Set(['   valkyrie ', 569.45, '   studios  ']), {delim: '@', valround: 3})).toBe('valkyrie@569.45@studios');
        });

        it('removes multiple invalid values while joining', () => {
            expect(join(new Set([false, false, 'hi', false, false, 'there']), {delim: '|'})).toBe('hi|there');
        });

        it('allows you to dedupe values while joining', () => {
            expect(
                join(new Set(['prop_1', 'prop_2', 'prop_1', 'prop_3']), {
                    delim: ',',
                    dedupe: true,
                })
            ).toBe('prop_1,prop_2,prop_3');
        });

        it('allows you to dedupe after trimming values while joining', () => {
            expect(
                join(new Set(['prop_1', 'prop_2', ' prop_1', 'prop_3 ', ' prop_3']), {
                    delim: ',',
                    dedupe: true,
                })
            ).toBe('prop_1,prop_2,prop_3');
        });

        it('allows you to dedupe after rounding values while joining', () => {
            expect(join(new Set([58.432, 58.43, 58.421]), {delim: '@', dedupe: true, valround: 1})).toBe('58.4');
        });

        it('allows you to dedupe after rounding values while joining and dedupe after stringification', () => {
            expect(join(new Set([58.432, 58.43, 58.421, '58', 59.1, '59']), {delim: '@', dedupe: true, valround: 0})).toBe('58@59');
        });
    });
});
