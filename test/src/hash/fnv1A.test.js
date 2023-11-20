'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.js';
import fnv1A            from '../../../src/hash/fnv1A.js';

describe('Hash - fnv1A', () => {
    it ('should output the same hash for the same value', () => {
        const a_1 = fnv1A('Hello World');
        const a_2 = fnv1A('Hello World');
        const b_1 = fnv1A([0, 1, 2, 3, 4, 5]);
        const b_2 = fnv1A([0, 1, 2, 3, 4, 5]);
        const c_1 = fnv1A({
            foo: 'bar',
            a : true,
            b : false,
            c : {
                d : [0, 1, 2, 3, { a: 'hello', b: 'world', c: [0, 1, 2, 3] }],
                e : 10234,
            },
        });
        const c_2 = fnv1A({
            foo: 'bar',
            a : true,
            b : false,
            c : {
                d : [0, 1, 2, 3, { a: 'hello', b: 'world', c: [0, 1, 2, 3] }],
                e : 10234,
            },
        });
        const d_1 = fnv1A(new Date(2018, 12, 5));
        const d_2 = fnv1A(new Date(2018, 12, 5));
        const d_3 = fnv1A(new Date(2018, 12, 4));
        const e_1 = fnv1A(new RegExp('abcdefg', 'i'));
        const e_2 = fnv1A(new RegExp('abcdefg', 'i'));
        const e_3 = fnv1A(new RegExp('abcdefg', 'ig'));
        const e_4 = fnv1A(new RegExp('abcdefghij', 'i'));
        assert.ok(a_1 === a_2);
        assert.ok(b_1 === b_2);
        assert.ok(c_1 === c_2);
        assert.ok(d_1 === d_2);
        assert.equal(d_1 === d_3, false);
        assert.ok(e_1 === e_2);
        assert.equal(e_1 === e_3, false);
        assert.equal(e_1 === e_4, false);
    });

    it ('should throw a type error when passed an unhashable value', () => {
        assert.throws(
            () => fnv1A(new Function()),
            new TypeError('An FNV1A Hash could not be calculated for this datatype')
        );
    });

    //  Based on some tests available at : http://isthe.com/chongo/src/fnv/test_fnv.c
    it ('should output values that equal the official spec (32 bit)', () => {
        assert.ok(fnv1A("") === 0x811c9dc5);
        assert.ok(fnv1A("a") === 0xe40c292c);
        assert.ok(fnv1A("b") === 0xe70c2de5);
        assert.ok(fnv1A("c") === 0xe60c2c52);
        assert.ok(fnv1A("d") === 0xe10c2473);
        assert.ok(fnv1A("e") === 0xe00c22e0);
        assert.ok(fnv1A("f") === 0xe30c2799);
        assert.ok(fnv1A("fo") === 0x6222e842);
        assert.ok(fnv1A("foo") === 0xa9f37ed7);
        assert.ok(fnv1A("foob") === 0x3f5076ef);
        assert.ok(fnv1A("fooba") === 0x39aaa18a);
        assert.ok(fnv1A("foobar") === 0xbf9cf968);
        assert.ok(fnv1A("64.81.78.84") === 0xa55b89ed);
        assert.ok(fnv1A("feedfacedaffdeed") === 0xe83641e1);
        assert.ok(fnv1A("http://www.fourmilab.ch/gravitation/orbits/") === 0x29b50b38);
        assert.ok(fnv1A("EFCDAB8967452301") === 0x7fcb2275);
        assert.ok(fnv1A("2^21701-1") === 0xc0ed2114);
    });
});
