import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import merge from '../../../lib/object/merge';

describe('Object - merge', () => {
    it('Returns the target object if only passed a target', () => {
        // @ts-ignore
        expect(merge({a: 1, b: 2})).toEqual({a: 1, b: 2});
    });

    it('Merges keys correctly', () => {
        expect(
            merge({a: 1, b: 2, c: true}, {a: 5, c: false})
        ).toEqual({a: 5, b: 2, c: false});

        expect(
            merge({
                a: [0, 1, 2, 3],
                b: {
                    name: 'utils',
                    status: 0,
                    available: false,
                },
                c: {
                    foo: 'bar',
                    hello: 'world',
                },
            }, {
                a: ['foo', 'bar'],
                b: {available: true},
                c: {hello: 'core'},
            })
        ).toEqual({
            a: ['foo', 'bar'],
            b: {
                name: 'utils',
                status: 0,
                available: true,
            },
            c: {
                foo: 'bar',
                hello: 'core',
            },
        });
    });

    it('Merges keys correctly when passed a source that is not as complete as target', () => {
        expect(
            merge(
                {
                    a: 1,
                    b: {
                        d: {bd: 'hello'},
                        f: false,
                    },
                },
                {
                    a: 5,
                    b: {
                        f: 'world',
                    },
                }
            )
        ).toEqual({
            a: 5,
            b: {
                d: {bd: 'hello'},
                f: 'world',
            },
        });
    });

    it('Does not merge in keys that are not defined in the target by default', () => {
        expect(
            merge({a: 1, b: 2}, {a: 2, b: 3, c: 4})
        ).toEqual({a: 2, b: 3});
    });

    it('Does merge in keys that are not defined in the target when union is passed as true', () => {
        expect(
            merge({a: 1, b: 2}, {a: 2, b: 3, c: 4}, {union: true})
        ).toEqual({a: 2, b: 3, c: 4});
    });

    it('Correctly merges two distinct objects with no overlapping keys when in union mode', () => {
        expect(
            merge({a: 1, b: 2}, {c: 3, d: 4}, {union: true})
        ).toEqual({a: 1, b: 2, c: 3, d: 4});
    });

    it('Correctly merges two distinct objects with some overlapping keys when in union mode', () => {
        expect(
            merge({a: 1, b: 2}, {b: 999, c: 3, d: 4}, {union: true})
        ).toEqual({a: 1, b: 999, c: 3, d: 4});
    });

    it('Correctly deep merges two distinct objects with some overlapping keys when in union mode', () => {
        expect(
            merge(
                {
                    a: 1,
                    b: {
                        a: 'Hello',
                        b: 'World',
                        c: {
                            foo: 'bar',
                        },
                    },
                    c: {
                        a: 'Hello',
                        b: 'World',
                        c: {
                            bar: 'foo',
                        },
                    },
                },
                {
                    a: 1,
                    c: {
                        a: 1,
                        c: {
                            oof: 'nice',
                            foo: {hello: 'There'},
                        },
                        d: 'nice',
                    },
                    b: {
                        a: 'Hello',
                        b: 'World',
                        c: {
                            bar: 'foo',
                        },
                    },
                    d: [1, 2, 3],
                },
                {union: true}
            )
        ).toEqual({
            a: 1,
            b: {
                a: 'Hello',
                b: 'World',
                c: {
                    foo: 'bar',
                    bar: 'foo',
                },
            },
            c: {
                a: 1,
                b: 'World',
                c: {
                    oof: 'nice',
                    bar: 'foo',
                    foo: {hello: 'There'},
                },
                d: 'nice',
            },
            d: [1, 2, 3],
        });
    });

    it('Correctly deep merges two distinct objects with some overlapping keys when NOT in union mode', () => {
        expect(
            merge(
                {
                    a: 1,
                    b: {
                        a: 'Hello',
                        b: 'World',
                        c: {
                            foo: 'bar',
                        },
                    },
                    c: {
                        a: 'Hello',
                        b: 'World',
                        c: {
                            bar: 'foo',
                        },
                    },
                },
                {
                    a: 1,
                    c: {
                        a: 1,
                        c: {
                            oof: 'nice',
                            foo: {hello: 'There'},
                        },
                        d: 'nice',
                    },
                    b: {
                        a: 'Hallo',
                        b: 'Wereld',
                        c: {
                            bar: 'foo',
                        },
                    },
                    d: [1, 2, 3],
                },
                {union: false}
            )
        ).toEqual({
            a: 1,
            b: {
                a: 'Hallo',
                b: 'Wereld',
                c: {
                    foo: 'bar',
                },
            },
            c: {
                a: 1,
                b: 'World',
                c: {
                    bar: 'foo',
                },
            },
        });
    });

    it('merges correctly in union mode when passing an array of sources', () => {
        expect(merge({}, [
            {a: 1},
            {b: 2},
            {c: 3, d: {foo: 'bar'}},
            {d: {bar: 'foo'}, evt: 5},
        ], {union: true})).toEqual({
            a: 1,
            b: 2,
            c: 3,
            d: {
                foo: 'bar',
                bar: 'foo',
            },
            evt: 5,
        });
    });

    it('merges correctly in non-union mode when passing an array of sources', () => {
        expect(merge({a: 1, b: 2, d: {bar: 'howdie'}}, [
            {a: 1},
            {b: 2},
            {c: 3, d: {foo: 'bar'}},
            {d: {bar: 'foo'}, evt: 5},
        ], {union: false})).toEqual({
            a: 1,
            b: 2,
            d: {
                bar: 'foo',
            },
        });
    });

    it('ignores invalid entries when passed an array containing invalid objects', () => {
        expect(
            // @ts-ignore
            merge({a: 1}, CONSTANTS.NOT_OBJECT)
        ).toEqual({a: 1});

        expect(
            merge({a: 1}, [{b: 2}, ...CONSTANTS.NOT_OBJECT])
        ).toEqual({a: 1});
    });

    it('throws an error when passed something else than an object target', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            expect(() => merge(el, {a: 2})).toThrowError(/object\/merge: Please ensure valid target\/source is passed/);
        }
    });

    it('throws an error when passed something else than an object target', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            expect(() => merge(el, {a: 2})).toThrowError(/object\/merge: Please ensure valid target\/source is passed/);
        }
    });

    it('throws an error when passed something else than an object source', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            if (el === undefined) continue;
            expect(() => merge(el, {a: 2})).toThrowError(/object\/merge: Please ensure valid target\/source is passed/);
        }
    });

    it('Should automatically build sublevels where necessary', () => {
        expect(
            merge({a: 1}, {settings: {flags: {flag_1: true, flag_2: false}}}, {union: true})
        ).toEqual({
            a: 1,
            settings: {
                flags: {
                    flag_1: true,
                    flag_2: false,
                },
            },
        });
    });

    it('Should automatically build sublevels where necessary when key is undefined/null in prior objects', () => {
        expect(
            merge({a: 1, settings: undefined}, {settings: {flags: {flag_1: true, flag_2: false}}}, {union: true})
        ).toEqual({
            a: 1,
            settings: {
                flags: {
                    flag_1: true,
                    flag_2: false,
                },
            },
        });

        expect(
            merge({a: 1, settings: null}, {settings: {flags: {flag_1: true, flag_2: false}}}, {union: true})
        ).toEqual({
            a: 1,
            settings: {
                flags: {
                    flag_1: true,
                    flag_2: false,
                },
            },
        });
    });

    it('Should automatically build sublevels where necessary when key is undefined/null in sublevels on prior objects', () => {
        expect(
            merge({a: 1, settings: {flags: undefined}}, {settings: {flags: {flag_1: true, flag_2: false}}}, {union: true})
        ).toEqual({
            a: 1,
            settings: {
                flags: {
                    flag_1: true,
                    flag_2: false,
                },
            },
        });

        expect(
            merge({a: 1, settings: {flags: null}}, {settings: {flags: {flag_1: true, flag_2: false}}}, {union: true})
        ).toEqual({
            a: 1,
            settings: {
                flags: {
                    flag_1: true,
                    flag_2: false,
                },
            },
        });

        expect(
            merge(
                {a: 1, settings: {flags: {flag_3: true, flag_1: false}}},
                {settings: {flags: {flag_1: true, flag_2: false}}},
                {union: true}
            )
        ).toEqual({
            a: 1,
            settings: {
                flags: {
                    flag_1: true,
                    flag_2: false,
                    flag_3: true,
                },
            },
        });
    });

    it('Should not copy nested keys in non-union mode if they do not exist on target', () => {
        const target = {user: {name: 'Alice'}};
        const source = {user: {name: 'Bob', email: 'bob@example.com'}};

        const result = merge(target, source, {union: false});

        expect(result).toEqual({user: {name: 'Bob'}});
    });

    it('Should not mutate the original target object during deep merge', () => {
        const target = {a: {b: {c: 1}}};
        const source = {a: {b: {d: 2}}};

        const result = merge(target, source, {union: true});

        expect(result).toEqual({a: {b: {c: 1, d: 2}}});
        expect(target).toEqual({a: {b: {c: 1}}}); // original remains unchanged
    });

    it('Should preserve only matching keys in deep structure when union is false', () => {
        const target = {a: {b: {c: true}}};
        const source = {a: {b: {c: false, d: 'skip this'}}};

        const result = merge(target, source, {union: false});

        expect(result).toEqual({a: {b: {c: false}}});
    });

    it('Should copy extra nested keys in union mode', () => {
        const target = {a: {b: {c: true}}};
        const source = {a: {b: {c: false, d: 'included'}}};

        const result = merge(target, source, {union: true});

        expect(result).toEqual({a: {b: {c: false, d: 'included'}}});
    });

    it('Should skip unknown keys in non-union mode across multiple sources', () => {
        const base = {a: 1, b: {x: 2}};

        const result = merge(base, [
            {a: 5, b: {x: 10, y: 999}},
            {c: 123},
        ], {union: false});

        expect(result).toEqual({
            a: 5,
            b: {x: 10},
        });
    });

    it('Should include all keys across multiple sources in union mode', () => {
        const base = {a: 1, b: {x: 2}};

        const result = merge(base, [
            {a: 5, b: {x: 10, y: 999}},
            {c: 123},
        ], {union: true});

        expect(result).toEqual({
            a: 5,
            b: {x: 10, y: 999},
            c: 123,
        });
    });
});
