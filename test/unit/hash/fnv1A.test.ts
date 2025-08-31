import {describe, it, expect} from 'vitest';
import fnv1A from '../../../lib/hash/fnv1A';

describe('Hash - fnv1A', () => {
    it('should output the same hash for the same value', () => {
        const a_1 = fnv1A('Hello World');
        const a_2 = fnv1A('Hello World');
        const b_1 = fnv1A([0, 1, 2, 3, 4, 5]);
        const b_2 = fnv1A([0, 1, 2, 3, 4, 5]);
        const c_1 = fnv1A({
            foo: 'bar',
            a : true,
            b : false,
            c : {
                d : [0, 1, 2, 3, {a: 'hello', b: 'world', c: [0, 1, 2, 3]}],
                ebc : 10234,
            },
        });
        const c_2 = fnv1A({
            foo: 'bar',
            a : true,
            b : false,
            c : {
                d : [0, 1, 2, 3, {a: 'hello', b: 'world', c: [0, 1, 2, 3]}],
                ebc : 10234,
            },
        });
        const d_1 = fnv1A(new Date(2018, 12, 5));
        const d_2 = fnv1A(new Date(2018, 12, 5));
        const d_3 = fnv1A(new Date(2018, 12, 4));
        const e_1 = fnv1A(new RegExp('abcdefg', 'i'));
        const e_2 = fnv1A(new RegExp('abcdefg', 'i'));
        const e_3 = fnv1A(new RegExp('abcdefg', 'ig'));
        const e_4 = fnv1A(new RegExp('abcdefghij', 'i'));

        expect(a_1).toBe(a_2);
        expect(b_1).toBe(b_2);
        expect(c_1).toBe(c_2);
        expect(d_1).toBe(d_2);
        expect(d_1 === d_3).toBe(false);
        expect(e_1).toBe(e_2);
        expect(e_1 === e_3).toBe(false);
        expect(e_1 === e_4).toBe(false);
    });

    it('should throw a type error when passed an unhashable value', () => {
        expect(() => fnv1A(() => {})).toThrowError(new TypeError('A Hash could not be calculated for this datatype'));
        expect(() => fnv1A(new FormData())).toThrowError(new TypeError('A Hash could not be calculated for this datatype'));
    });

    it('should output values that equal the official spec (32 bit)', () => {
        expect(fnv1A('')).toBe(0x811c9dc5);
        expect(fnv1A('a')).toBe(0xe40c292c);
        expect(fnv1A('b')).toBe(0xe70c2de5);
        expect(fnv1A('c')).toBe(0xe60c2c52);
        expect(fnv1A('d')).toBe(0xe10c2473);
        expect(fnv1A('e')).toBe(0xe00c22e0);
        expect(fnv1A('f')).toBe(0xe30c2799);
        expect(fnv1A('fo')).toBe(0x6222e842);
        expect(fnv1A('foo')).toBe(0xa9f37ed7);
        expect(fnv1A('foob')).toBe(0x3f5076ef);
        expect(fnv1A('fooba')).toBe(0x39aaa18a);
        expect(fnv1A('foobar')).toBe(0xbf9cf968);
        expect(fnv1A('64.81.78.84')).toBe(0xa55b89ed);
        expect(fnv1A('feedfacedaffdeed')).toBe(0xe83641e1);
        expect(fnv1A('http://www.fourmilab.ch/gravitation/orbits/')).toBe(0x29b50b38);
        expect(fnv1A('EFCDAB8967452301')).toBe(0x7fcb2275);
        expect(fnv1A('2^21701-1')).toBe(0xc0ed2114);
        expect(fnv1A(50)).toBe(0x83e140a0);
    });

    it('should compute same hash for nan and negative/positive infinity', () => {
        expect(fnv1A(Number.NEGATIVE_INFINITY)).toBe(fnv1A(Number.POSITIVE_INFINITY));
        expect(fnv1A(Number.NaN)).toBe(fnv1A(Number.POSITIVE_INFINITY));
    });

    it('should compute same hash for undefined', () => {
        expect(fnv1A(undefined)).toBe(0x9b61ad43);
    });

    it('should compute hash for bigint', () => {
        expect(fnv1A(BigInt(4732894))).toBe(253493650);
    });

    it('should compute same hash for bigint', () => {
        expect(fnv1A(BigInt(4732894))).toBe(fnv1A(BigInt(4732894)));
    });

    it('should compute hash for error object', () => {
        const err = new Error('Hello World');
        expect(fnv1A(err)).toBe(1208468069);
    });

    it('should compute same hash for similar error objects', () => {
        const err = new Error('Hello World');
        const err2 = new Error('Hello World');
        expect(fnv1A(err)).toBe(fnv1A(err2));
    });

    it('should not compute same hash for error objects with different type', () => {
        const err = new Error('Hello World');
        const err2 = new TypeError('Hello World');
        expect(fnv1A(err)).not.toBe(fnv1A(err2));
    });

    it('should not compute same hash for error objects with different message', () => {
        const err = new Error('Hello World');
        const err2 = new Error('Hello Worldje');
        expect(fnv1A(err)).not.toBe(fnv1A(err2));
    });

    it('should compute same hash for null', () => {
        expect(fnv1A(null)).toBe(0x77074ba4);
    });

    it('should compute correct hash for an object', () => {
        const a = {hello: 'world', a: [1, 2, 3]};
        expect(fnv1A(a)).toBe(0xaebe1fdc);
        expect(fnv1A(a)).toBe(0xaebe1fdc);
    });

    it('should compute correct hash for an array', () => {
        const a = [1, 2, 3, false, {a: 'hello world'}];
        expect(fnv1A(a)).toBe(0x3b4bad41);
        expect(fnv1A(a)).toBe(0x3b4bad41);
    });

    it('should compute correct hash for a date', () => {
        expect(fnv1A(new Date('2022-02-04T04:20:00.000Z'))).toBe(0x254bba72);
        expect(fnv1A(new Date('2022-02-04T05:21:39.000Z'))).toBe(0x45a0ba63);
    });

    it('should compute correct hash for a regexp', () => {
        expect(fnv1A(/(\s){2,}/g)).toBe(0x48cb73a);
        expect(fnv1A(/(\s){2,}/g)).toBe(0x48cb73a);
        expect(fnv1A(new RegExp('\\s{3,}', 'g'))).toBe(0xdf966318);
    });

    it('Should compute correct hash for a boolean false', () => {
        expect(fnv1A(false)).toBe(0x0b069958);
        expect(fnv1A(true)).toBe(0x4db211e5);
        expect(fnv1A(false)).toBe(0x0b069958);
        expect(fnv1A(true)).toBe(0x4db211e5);
    });

    it('Should throw when passed a value it can’t do', () => {
        expect(() => fnv1A(new FormData())).toThrowError(new TypeError('A Hash could not be calculated for this datatype'));
    });
});
