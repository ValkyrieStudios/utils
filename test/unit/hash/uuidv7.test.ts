/* eslint-disable no-bitwise */

import {describe, it, expect} from 'vitest';
import {uuidv7} from '../../../lib/hash/uuidv7';
import sleep from '../../../lib/function/sleep';

describe('Hash - uuidv7', () => {
    it('Output a string value', () => {
        expect(typeof uuidv7()).toBe('string');
    });

    it('Have exactly 36 characters', () => {
        expect(uuidv7().length).toBe(36);
    });

    it('Match UUID format 8-4-4-4-12', () => {
        const id = uuidv7();
        expect(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)).toBe(true);
    });

    it('Contain version 7 in correct position', () => {
        const id = uuidv7();
        // 14th hex char is version nibble
        const versionChar = id.split('-')[2][0];
        expect(versionChar).toBe('7');
    });

    it('Contain variant 10xx in correct position', () => {
        const id = uuidv7();
        // 19th hex char is variant nibble
        const variantChar = id.split('-')[3][0];
        const variantNibble = parseInt(variantChar, 16);
        expect((variantNibble & 0b1100) >>> 2).toBe(0b10 >> 0); // top two bits = 10
    });

    it('Be unique (50,000 benchmark)', () => {
        const set = new Set();
        let cursor = 0;
        while (cursor < 50000) {
            set.add(uuidv7());
            cursor++;
        }
        expect(set.size).toBe(cursor);
    });

    it('Be unique (100,000 benchmark)', () => {
        const set = new Set();
        let cursor = 0;
        while (cursor < 100000) {
            set.add(uuidv7());
            cursor++;
        }
        expect(set.size).toBe(cursor);
    });

    it('Monotonic ordering by timestamp', async () => {
        const first = uuidv7();
        await sleep(1000);
        const second = uuidv7();
        await sleep(1000);
        const third = uuidv7();
        expect(first < second).toBe(true);
        expect(second < third).toBe(true);
    });
});
