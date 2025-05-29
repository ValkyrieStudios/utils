import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import sanitize from '../../../lib/regexp/sanitize';

describe('RegExp - sanitize', () => {
    it('Return false when passing nothing', () => {
        // @ts-ignore
        expect(sanitize()).toBe(false);
    });

    it('Return false when passed a non-string value', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            expect(sanitize(el)).toBe(false);
        }
    });

    it('Should return escaped string when passed a string with special characters', () => {
        const cases = [
            ['Av. P)', 'Av\\. P\\)'],
            ['Suc contry(garza sada', 'Suc contry\\(garza sada'],
            ['contact@valkyriestudios.be', 'contact@valkyriestudios\\.be'],
            ['*alond', '\\*alond'],
            ['[a', '\\[a'],
            ['[a]', '\\[a\\]'],
        ];
        for (const [input, expected] of cases) {
            expect(sanitize(input)).toBe(expected);
        }
    });

    it('Should autotrim passed strings', () => {
        expect(sanitize('   hello world   ')).toBe('hello world');
    });

    it('Should autotrim passed strings and escape special characters', () => {
        const cases = [
            ['  Av. P)', 'Av\\. P\\)'],
            ['Suc contry(garza sada  ', 'Suc contry\\(garza sada'],
            [' contact@valkyriestudios.be ', 'contact@valkyriestudios\\.be'],
            ['*alond   ', '\\*alond'],
            ['  [a   ', '\\[a'],
            ['[a]   ', '\\[a\\]'],
        ];
        for (const [input, expected] of cases) {
            expect(sanitize(input)).toBe(expected);
        }
    });
});
