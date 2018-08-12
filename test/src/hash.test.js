import { guid, fnv1A } from '../../src/hash';

describe("Hash - Guid", () => {
    it ('output a string value', () => {
        let g = guid();
        expect(g).toEqual(jasmine.any(String));
    });

    it ('have exactly 36 characters', () => {
        let g = guid();
        expect(g.length).toBe(36);
    });

    it ('match the rfc4122 spec', () => {
        let g = guid();
        expect(/^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/g.test(g)).toBe(true);
    });

    it ('be unique (50.000 benchmark)', () => {
        const cache = {};
        let cursor = 0;

        while (cursor < 50000) {
            cache[guid()] = true;
            cursor++;
        }

        expect(Object.keys(cache).length).toBe(cursor);
    });
});

describe("Hash - FNV1A", () => {
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
        expect(a_1).toEqual(a_2);
        expect(b_1).toEqual(b_2);
        expect(c_1).toEqual(c_2);
    });

    //  Based on some tests available at : http://isthe.com/chongo/src/fnv/test_fnv.c
    it ('should output values that equal the official spec (32 bit)', () => {
        expect(fnv1A("")).toEqual(0x811c9dc5);
        expect(fnv1A("a")).toEqual(0xe40c292c);
        expect(fnv1A("b")).toEqual(0xe70c2de5);
        expect(fnv1A("c")).toEqual(0xe60c2c52);
        expect(fnv1A("d")).toEqual(0xe10c2473);
        expect(fnv1A("e")).toEqual(0xe00c22e0);
        expect(fnv1A("f")).toEqual(0xe30c2799);
        expect(fnv1A("fo")).toEqual(0x6222e842);
        expect(fnv1A("foo")).toEqual(0xa9f37ed7);
        expect(fnv1A("foob")).toEqual(0x3f5076ef);
        expect(fnv1A("fooba")).toEqual(0x39aaa18a);
        expect(fnv1A("foobar")).toEqual(0xbf9cf968);
        expect(fnv1A("64.81.78.84")).toEqual(0xa55b89ed);
        expect(fnv1A("feedfacedaffdeed")).toEqual(0xe83641e1);
        expect(fnv1A("http://www.fourmilab.ch/gravitation/orbits/")).toEqual(0x29b50b38);
        expect(fnv1A("EFCDAB8967452301")).toEqual(0x7fcb2275);
        expect(fnv1A("2^21701-1")).toEqual(0xc0ed2114);
    });

});
