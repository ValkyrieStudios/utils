import {bench, describe} from 'vitest';
import scramble from '../../../lib/object/scramble';

const deep = {
    a: 1,
    b: {c: 2, d: 3, e: {f: 4, g: 5}},
    arr: [{id: 1, token: 'abc'}, {id: 2, token: 'def'}],
    nested: {
        users: [{profile: {secret: 'yes', age: 42}}],
        accessToken: 'abcd',
    },
};

describe('Benchmark - object/scramble', () => {
    bench('Shallow keys', () => {
        scramble(deep, ['a']);
    });

    bench('Deep dotted keys', () => {
        scramble(deep, ['b.e.f', 'nested.users.profile.age']);
    });

    bench('Deep wildcard keys', () => {
        scramble(deep, ['*.token', '*.secret']);
    });

    bench('Recursive wildcards', () => {
        scramble(deep, ['*.secret', '*.age', 'nested.accessToken']);
    });
});
