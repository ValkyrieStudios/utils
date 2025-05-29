import {describe, it, expect} from 'vitest';
import nowUnixMs from '../../../lib/date/nowUnixMs';

describe('Date - nowUnixMs', () => {
    it('Returns unix timestamp in milliseconds', () => {
        const now = Date.now();
        const result = nowUnixMs();
        expect(result === now || result === now + 1).toBe(true);
    });
});
