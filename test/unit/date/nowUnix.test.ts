import {describe, it, expect} from 'vitest';
import nowUnix from '../../../lib/date/nowUnix';

describe('Date - nowUnix', () => {
    it('Returns unix timestamp in seconds', () => {
        expect(nowUnix()).toBe(Math.floor(Date.now() / 1000));
    });
});
