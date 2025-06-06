import {bench, describe} from 'vitest';
import omit from '../../../lib/object/omit';

const deep = {
    a: 1,
    b: {c: 2, d: 3, e: {f: 4, g: 5}},
    arr: [{id: 1, token: 'abc'}, {id: 2, token: 'def'}],
    nested: {
        users: [{profile: {secret: 'yes', age: 42}}],
        accessToken: 'abcd',
    },
};

describe('Benchmark - object/omit', () => {
    bench('Shallow keys', () => {
        omit(deep, ['a']);
    });

    bench('Deep dotted keys', () => {
        omit(deep, ['b.e.f', 'nested.users.profile.age']);
    });

    bench('Deep wildcard keys', () => {
        omit(deep, ['*.token', '*.secret']);
    });

    bench('Recursive wildcards', () => {
        omit(deep, ['*.secret', '*.age', 'nested.accessToken']);
    });
});
