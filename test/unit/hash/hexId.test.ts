import {describe, it, expect} from 'vitest';
import {hexId} from '../../../lib/hash/hexId';

describe('Hash - hexId', () => {
    it('Output a string value', () => {
        expect(typeof hexId(8)).toBe('string');
    });

    it('Have correct length (2 * size)', () => {
        expect(hexId(8).length).toBe(16);
        expect(hexId(16).length).toBe(32);
        expect(hexId(32).length).toBe(64);
    });

    it('Contain only hex characters', () => {
        const id = hexId(16);
        expect(/^[0-9a-f]+$/i.test(id)).toBe(true);
    });

    it('Be unique (50,000 benchmark)', () => {
        const set = new Set();
        let cursor = 0;
        while (cursor < 50000) {
            set.add(hexId(16));
            cursor++;
        }
        expect(set.size).toBe(cursor);
    });

    it('Be unique (100,000 benchmark)', () => {
        const set = new Set();
        let cursor = 0;
        while (cursor < 100000) {
            set.add(hexId(16));
            cursor++;
        }
        expect(set.size).toBe(cursor);
    });

    it('Be unique (200,000 benchmark)', () => {
        const set = new Set();
        let cursor = 0;
        while (cursor < 200000) {
            set.add(hexId(16));
            cursor++;
        }
        expect(set.size).toBe(cursor);
    });

    it('Return empty string for invalid size', () => {
        expect(hexId(NaN)).toBe('');
        expect(hexId(3.14)).toBe('');
        expect(hexId(-5)).toBe('');
    });
});
