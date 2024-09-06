import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import merge            from '../../../lib/object/merge';

describe('Object - merge', () => {
    it('Returns the target object if only passed a target', () => {
        assert.deepEqual(merge({a: 1, b: 2}), {a: 1, b: 2});
    });

    it('Merges keys correctly', () => {
        assert.deepEqual(
            merge({a: 1, b: 2, c: true}, {a: 5, c: false}),
            {a: 5, b: 2, c: false}
        );
        assert.deepEqual(
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
            }),
            {
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
            }
        );
    });

    it('Merges keys correctly when passed a source that is not as complete as target', () => {
        assert.deepEqual(
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
            ),
            {
                a: 5,
                b: {
                    d: {bd: 'hello'},
                    f: 'world',
                },
            }
        );
    });

    it('Does not merge in keys that are not defined in the target by default', () => {
        assert.deepEqual(
            merge({a: 1, b: 2}, {a: 2, b: 3, c: 4}),
            {a: 2, b: 3}
        );
    });

    it('Does merge in keys that are not defined in the target when union is passed as true', () => {
        assert.deepEqual(
            merge({a: 1, b: 2}, {a: 2, b: 3, c: 4}, {union: true}),
            {a: 2, b: 3, c: 4}
        );
    });

    it('Correctly merges two distinct objects with no overlapping keys when in union mode', () => {
        assert.deepEqual(
            merge({a: 1, b: 2}, {c: 3, d: 4}, {union: true}),
            {a: 1, b: 2, c: 3, d: 4}
        );
    });

    it('Correctly merges two distinct objects with some overlapping keys when in union mode', () => {
        assert.deepEqual(
            merge({a: 1, b: 2}, {b: 999, c: 3, d: 4}, {union: true}),
            {a: 1, b: 999, c: 3, d: 4}
        );
    });

    it('Correctly deep merges two distinct objects with some overlapping keys when in union mode', () => {
        assert.deepEqual(
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
                }, {
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
                }, {union: true}
            ),
            {
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
            }
        );
    });

    it('Correctly deep merges two distinct objects with some overlapping keys when NOT in union mode', () => {
        assert.deepEqual(
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
                }, {
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
                }, {union: false}
            ),
            {
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
            }
        );
    });

    it('merges correctly in union mode when passing an array of sources', () => {
        assert.deepEqual(merge({}, [
            {a: 1},
            {b: 2},
            {c: 3, d: {foo: 'bar'}},
            {d: {bar: 'foo'}, evt: 5},
        ], {union: true}), {
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
        assert.deepEqual(merge({a: 1, b: 2, d: {bar: 'howdie'}}, [
            {a: 1},
            {b: 2},
            {c: 3, d: {foo: 'bar'}},
            {d: {bar: 'foo'}, evt: 5},
        ], {union: false}), {
            a: 1,
            b: 2,
            d: {
                bar: 'foo',
            },
        });
    });

    it('ignores invalid entries when passed an array containing invalid objects', () => {
        assert.deepEqual(
            merge({a: 1}, CONSTANTS.NOT_OBJECT),
            {a: 1}
        );

        assert.deepEqual(
            merge({a: 1}, [{b: 2}, ...CONSTANTS.NOT_OBJECT]),
            {a: 1}
        );
    });

    it('throws an error when passed something else than an object target', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            assert.throws(
                () => merge(el, {a: 2}),
                new Error('object/merge: Please ensure valid target/source is passed')
            );
        }
    });

    it('throws an error when passed something else than an object target', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            assert.throws(
                () => merge(el, {a: 2}),
                new Error('object/merge: Please ensure valid target/source is passed')
            );
        }
    });

    it('throws an error when passed something else than an object source', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            if (el === undefined) continue;
            assert.throws(
                () => merge(el, {a: 2}),
                new Error('object/merge: Please ensure valid target/source is passed')
            );
        }
    });
});
