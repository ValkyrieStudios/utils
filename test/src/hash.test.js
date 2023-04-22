'use strict';

import guid     from '../../src/hash/guid';
import fnv1A    from '../../src/hash/fnv1A';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("Hash", () => {
    describe("Guid", () => {
        it ('output a string value', () => {
            let g = guid();
            assert.typeOf(g, 'string');
        });

        it ('have exactly 36 characters', () => {
            let g = guid();
            expect(g.length).to.eql(36);
        });

        it ('match the rfc4122 spec', () => {
            let g = guid();
            expect(/^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/g.test(g)).to.eql(true);
        });

        it ('be unique (50.000 benchmark)', () => {
            const cache = {};
            let cursor = 0;

            while (cursor < 50000) {
                cache[guid()] = true;
                cursor++;
            }

            expect(Object.keys(cache).length).to.eql(cursor);
        });
    });

    describe("FNV1A", () => {
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
            expect(a_1).to.eql(a_2);
            expect(b_1).to.eql(b_2);
            expect(c_1).to.eql(c_2);
            expect(d_1).to.eql(d_2);
            expect(d_1 === d_3).to.eql(false);
            expect(e_1).to.eql(e_2);
            expect(e_1 === e_3).to.eql(false);
            expect(e_1 === e_4).to.eql(false);
        });

        it ('should throw a type error when passed an unhashable value', () => {
            expect(function () { fnv1A(new Function()) }).to.throw(TypeError);
        });

        //  Based on some tests available at : http://isthe.com/chongo/src/fnv/test_fnv.c
        it ('should output values that equal the official spec (32 bit)', () => {
            expect(fnv1A("")).to.eql(0x811c9dc5);
            expect(fnv1A("a")).to.eql(0xe40c292c);
            expect(fnv1A("b")).to.eql(0xe70c2de5);
            expect(fnv1A("c")).to.eql(0xe60c2c52);
            expect(fnv1A("d")).to.eql(0xe10c2473);
            expect(fnv1A("e")).to.eql(0xe00c22e0);
            expect(fnv1A("f")).to.eql(0xe30c2799);
            expect(fnv1A("fo")).to.eql(0x6222e842);
            expect(fnv1A("foo")).to.eql(0xa9f37ed7);
            expect(fnv1A("foob")).to.eql(0x3f5076ef);
            expect(fnv1A("fooba")).to.eql(0x39aaa18a);
            expect(fnv1A("foobar")).to.eql(0xbf9cf968);
            expect(fnv1A("64.81.78.84")).to.eql(0xa55b89ed);
            expect(fnv1A("feedfacedaffdeed")).to.eql(0xe83641e1);
            expect(fnv1A("http://www.fourmilab.ch/gravitation/orbits/")).to.eql(0x29b50b38);
            expect(fnv1A("EFCDAB8967452301")).to.eql(0x7fcb2275);
            expect(fnv1A("2^21701-1")).to.eql(0xc0ed2114);
        });

    });
});
