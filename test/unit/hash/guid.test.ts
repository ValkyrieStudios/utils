import {describe, it, expect} from 'vitest';
import guid from '../../../lib/hash/guid';

describe('Hash - guid', () => {
    it('Output a string value', () => {
        expect(typeof guid()).toBe('string');
    });

    it('Have exactly 36 characters', () => {
        expect(guid().length).toBe(36);
    });

    it('Match the rfc4122 spec', () => {
        expect(/^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/g.test(guid())).toBe(true);
    });

    it('Be unique (50,000 benchmark)', () => {
        const set = new Set();
        let cursor = 0;
        while (cursor < 50000) {
            set.add(guid());
            cursor++;
        }
        expect(set.size).toBe(cursor);
    });

    it('Be unique (100,000 benchmark)', () => {
        const set = new Set();
        let cursor = 0;
        while (cursor < 100000) {
            set.add(guid());
            cursor++;
        }
        expect(set.size).toBe(cursor);
    });

    it('Be unique (200,000 benchmark)', () => {
        const set = new Set();
        let cursor = 0;
        while (cursor < 200000) {
            set.add(guid());
            cursor++;
        }
        expect(set.size).toBe(cursor);
    });
});
