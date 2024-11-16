import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import join             from '../../../lib/array/join';

describe('Array - join', () => {
    it('Returns an empty string when passing nothing', () => {
        /* @ts-ignore */
        assert.equal(join(), '');
    });

    it('Return an empty string if passed a non-array or empty array as value', () => {
        for (const el of CONSTANTS.NOT_ARRAY_WITH_EMPTY) {
            assert.equal(join(el), '');
        }
    });

    it('Returns empty string when passing an array containing no strings or numbers', () => {
        assert.equal(join([
            ...CONSTANTS.IS_BOOLEAN,
            ...CONSTANTS.IS_REGEXP,
            ...CONSTANTS.IS_DATE,
            ...CONSTANTS.IS_ARRAY,
            ...CONSTANTS.IS_FUNCTION,
            ...CONSTANTS.IS_OBJECT,
            ...CONSTANTS.IS_NULLABLE,
        ]), '');
    });

    it('autotrims strings when joining by default', () => {
        const vals = ['   valkyrie ', '   studios  '];
        assert.equal(
            join(vals),
            'valkyrie studios'
        );
    });

    it('filters out trimmed strings when joining by default', () => {
        const vals = ['    ', '   studios  '];
        assert.equal(
            join(vals),
            'studios'
        );
    });

    it('does not autotrims strings when joining if option is turned off', () => {
        const vals = ['   valkyrie ', '   studios  '];
        assert.equal(
            join(vals, {valtrim: false}),
            'valkyrie     studios'
        );
    });

    it('does not autotrims strings when joining and after joining if option is turned off', () => {
        const vals = ['   valkyrie ', '   studios  '];
        assert.equal(
            join(vals, {valtrim: false, trim: false}),
            '   valkyrie     studios  '
        );
    });

    it('allows you to override the delimiter with an empty string when joining with trimming turned off', () => {
        const vals = ['   valkyrie ', '   studios  '];
        assert.equal(
            join(vals, {delim: '', valtrim: false, trim: false}),
            '   valkyrie    studios  '
        );
    });

    it('allows you to override the delimiter with an empty string when joining with trimming turned on', () => {
        const vals = ['   valkyrie ', '   studios  '];
        assert.equal(
            join(vals, {delim: ''}),
            'valkyriestudios'
        );
    });

    it('allows you to override the delimiter with a different string when joining with trimming turned on', () => {
        const vals = ['   valkyrie ', '   studios  '];
        assert.equal(
            join(vals, {delim: '@'}),
            'valkyrie@studios'
        );
    });

    it('allows you to join a mix of numbers and strings', () => {
        const vals = ['   valkyrie ', 569.45, '   studios  '];
        assert.equal(
            join(vals, {delim: '@'}),
            'valkyrie@569.45@studios'
        );
    });

    it('allows you to join only numbers', () => {
        const vals = [569.45, 965.12];
        assert.equal(
            join(vals, {delim: '@', valround: 0}),
            '569@965'
        );
    });

    it('allows you to turn on innertrim to trim inside of the strings as well', () => {
        const vals = ['   hello     world    ', ' this    is', '   peter   from    valkyrie'];
        assert.equal(
            join(vals, {delim: ' ', innertrim: true}),
            'hello world this is peter from valkyrie'
        );
    });

    it('allows you to join a mix of numbers and strings and autoround to a certain precision', () => {
        const vals = ['   valkyrie ', 569.45, '   studios  '];
        assert.equal(join(vals, {delim: '@', valround: 0}), 'valkyrie@569@studios');
        assert.equal(join(vals, {delim: '@', valround: 1}), 'valkyrie@569.5@studios');
        assert.equal(join(vals, {delim: '@', valround: 2}), 'valkyrie@569.45@studios');
        assert.equal(join(vals, {delim: '@', valround: 3}), 'valkyrie@569.45@studios');
    });

    it('removes multiple invalid values while joining', () => {
        assert.equal(join([false, false, 'hi', false, false, 'there'], {delim: '|'}), 'hi|there');
    });

    it('allows you to dedupe values while joining', () => {
        assert.equal(join(['prop_1', 'prop_2', 'prop_1', 'prop_3'], {
            delim: ',',
            dedupe: true,
        }), 'prop_1,prop_2,prop_3');

        assert.equal(join(['prop_1', 'prop_2', 'prop_1', 'prop_3'], {
            delim: ',',
            dedupe: false,
        }), 'prop_1,prop_2,prop_1,prop_3');
    });

    it('allows you to dedupe after trimming values while joining', () => {
        assert.equal(join(['prop_1', 'prop_2', ' prop_1', 'prop_3 ', ' prop_3'], {
            delim: ',',
            dedupe: true,
        }), 'prop_1,prop_2,prop_3');
    });

    it('allows you to dedupe after rounding values while joining', () => {
        assert.equal(join([58.432, 58.43, 58.421], {delim: '@', dedupe: true, valround: 1}), '58.4');
    });

    it('allows you to dedupe after rounding values while joining and dedupe after stringification', () => {
        assert.equal(join([58.432, 58.43, 58.421, '58', 59.1, '59'], {delim: '@', dedupe: true, valround: 0}), '58@59');
    });
});
