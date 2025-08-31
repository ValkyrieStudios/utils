import {describe, it, expect} from 'vitest';
import {djb2} from '../../../lib/hash/djb2';

describe('Hash - djb2', () => {
    it('should output the same hash for the same value', () => {
        const a_1 = djb2('Hello World');
        const a_2 = djb2('Hello World');
        const b_1 = djb2([0, 1, 2, 3, 4, 5]);
        const b_2 = djb2([0, 1, 2, 3, 4, 5]);
        const c_1 = djb2({
            foo: 'bar',
            a : true,
            b : false,
            c : {
                d : [0, 1, 2, 3, {a: 'hello', b: 'world', c: [0, 1, 2, 3]}],
                ebc : 10234,
            },
        });
        const c_2 = djb2({
            foo: 'bar',
            a : true,
            b : false,
            c : {
                d : [0, 1, 2, 3, {a: 'hello', b: 'world', c: [0, 1, 2, 3]}],
                ebc : 10234,
            },
        });
        const d_1 = djb2(new Date(2018, 12, 5));
        const d_2 = djb2(new Date(2018, 12, 5));
        const d_3 = djb2(new Date(2018, 12, 4));
        const e_1 = djb2(new RegExp('abcdefg', 'i'));
        const e_2 = djb2(new RegExp('abcdefg', 'i'));
        const e_3 = djb2(new RegExp('abcdefg', 'ig'));
        const e_4 = djb2(new RegExp('abcdefghij', 'i'));

        expect(a_1).toBe(a_2);
        expect(b_1).toBe(b_2);
        expect(c_1).toBe(c_2);
        expect(d_1).toBe(d_2);
        expect(d_1 === d_3).toBe(false);
        expect(e_1).toBe(e_2);
        expect(e_1 === e_3).toBe(false);
        expect(e_1 === e_4).toBe(false);
    });

    it('Should produce a consistent hash for a given string', () => {
        const hash1 = djb2('hello world');
        const hash2 = djb2('hello world');
        expect(hash1).toBe(hash2);
    });

    it('Should produce different hashes for different strings', () => {
        const h1 = djb2('a');
        const h2 = djb2('b');
        expect(h1).not.toBe(h2);
    });

    it('Should return a base36 string', () => {
        const hash = djb2('example');
        expect(hash).toMatch(/^[0-9a-z]+$/);
    });

    it('Should handle empty string', () => {
        const hash = djb2('');
        expect(typeof hash).toBe('string');
        expect(hash.length).toBeGreaterThan(0);
    });

    it('Should be case-sensitive', () => {
        expect(djb2('FOO')).not.toBe(djb2('foo'));
    });

    it('Should handle unicode characters', () => {
        expect(() => djb2('🚀🌌')).not.toThrow();
        expect(typeof djb2('🚀🌌')).toBe('string');
    });

    it('Should handle very long strings', () => {
        const long = 'a'.repeat(10_000);
        const hash = djb2(long);
        expect(typeof hash).toBe('string');
        expect(hash.length).toBeGreaterThan(0);
    });

    it('should compute hash for bigint', () => {
        expect(djb2(BigInt(4732894))).toBe('2671925458');
    });

    it('should compute same hash for bigint', () => {
        expect(djb2(BigInt(4732894))).toBe(djb2(BigInt(4732894)));
    });

    it('should compute hash for error object', () => {
        const err = new Error('Hello World');
        expect(djb2(err)).toBe('3807959297');
    });

    it('should compute same hash for similar error objects', () => {
        const err = new Error('Hello World');
        const err2 = new Error('Hello World');
        expect(djb2(err)).toBe(djb2(err2));
    });

    it('should not compute same hash for error objects with different type', () => {
        const err = new Error('Hello World');
        const err2 = new TypeError('Hello World');
        expect(djb2(err)).not.toBe(djb2(err2));
    });

    it('should not compute same hash for error objects with different message', () => {
        const err = new Error('Hello World');
        const err2 = new Error('Hello Worldje');
        expect(djb2(err)).not.toBe(djb2(err2));
    });

    it('should compute same hash for null', () => {
        expect(djb2(null)).toBe('2087897566');
    });

    it('should compute correct hash for an object', () => {
        const a = {hello: 'world', a: [1, 2, 3]};
        expect(djb2(a)).toBe('1143776344');
        expect(djb2(a)).toBe('1143776344');
    });

    it('should compute correct hash for an array', () => {
        const a = [1, 2, 3, false, {a: 'hello world'}];
        expect(djb2(a)).toBe('1985455251');
        expect(djb2(a)).toBe('1985455251');
    });

    it('should compute correct hash for a date', () => {
        expect(djb2(new Date('2022-02-04T04:20:00.000Z'))).toBe('2120182004');
        expect(djb2(new Date('2022-02-04T05:21:39.000Z'))).toBe('528670139');
    });

    it('should compute correct hash for a regexp', () => {
        expect(djb2(/(\s){2,}/g)).toBe('2441161044');
        expect(djb2(/(\s){2,}/g)).toBe('2441161044');
        expect(djb2(new RegExp('\\s{3,}', 'g'))).toBe('3688083700');
    });

    it('Should compute correct hash for a boolean false', () => {
        expect(djb2(false)).toBe('170962968');
        expect(djb2(true)).toBe('2087932467');
        expect(djb2(false)).toBe('170962968');
        expect(djb2(true)).toBe('2087932467');
    });

    it('Should throw when passed a value it can’t do', () => {
        expect(() => djb2(new FormData())).toThrowError(new TypeError('A Hash could not be calculated for this datatype'));
    });
});
