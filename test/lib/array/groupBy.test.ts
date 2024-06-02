import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import {groupBy}        from '../../../lib/array/groupBy';
import CONSTANTS        from '../../constants';

describe('Array - groupBy', () => {
    it('Returns empty object when passed nothing', () => {
        /* @ts-ignore */
        assert.deepEqual(groupBy(), {});
    });

    it('Returns empty object when passed a non-array or empty array', () => {
        for (const el of CONSTANTS.NOT_ARRAY_WITH_EMPTY) {
            /* @ts-ignore */
            assert.deepEqual(groupBy(el), {});
        }
    });

    it('Returns empty object when passed a non-string and non-function handler with a non-array or empty array', () => {
        for (const val of CONSTANTS.NOT_ARRAY_WITH_EMPTY) {
            for (const handler of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                if (typeof handler === 'function') continue;
                assert.deepEqual(groupBy(val, handler), {});
            }
        }
    });

    it('Returns empty object when passed invalid handler with an array that only consists of non-objects or empty objects', () => {
        for (const handler of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            if (typeof handler === 'function') continue;
            assert.deepEqual(groupBy(CONSTANTS.NOT_OBJECT_WITH_EMPTY, handler), {});
        }
    });

    it('Returns object with all entries mapped to _ when passed invalid handler but with a valid array', () => {
        for (const handler of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            if (typeof handler === 'function') continue;
            assert.deepEqual(groupBy([
                {status: 1, id: 12345},
                {status: 2, id: 23456},
                {status: 1, id: 34567},
                {status: 4, id: 45678},
            ], handler), {_: [
                {status: 1, id: 12345},
                {status: 2, id: 23456},
                {status: 1, id: 34567},
                {status: 4, id: 45678},
            ]});
        }
    });

    describe('handler:string', () => {
        it('Returns object with all entries mapped to _ when none of the objects have handler key', () => {
            assert.deepEqual(groupBy([
                {status: 1, id: 12345},
                {status: 2, id: 23456},
                {status: 1, id: 34567},
                {status: 4, id: 45678},
            ], 'role'), {_: [
                {status: 1, id: 12345},
                {status: 2, id: 23456},
                {status: 1, id: 34567},
                {status: 4, id: 45678},
            ]});
        });

        it('Returns object with all entries mapped correctly when some objects have key and some dont', () => {
            assert.deepEqual(groupBy([
                {status: 1, id: 12345},
                {id: 23456},
                {status: 1, id: 34567},
                {status: 4, id: 45678},
            ], 'status'), {
                _: [
                    {id: 23456},
                ],
                1: [
                    {status: 1, id: 12345},
                    {status: 1, id: 34567},
                ],
                4: [
                    {status: 4, id: 45678},
                ],
            });
        });

        it('Returns object with all entries mapped when all objects have key', () => {
            assert.deepEqual(groupBy([
                {status: 1, id: 12345},
                {status: 2, id: 23456},
                {status: 1, id: 34567},
                {status: 4, id: 45678},
            ], 'status'), {
                1: [
                    {status: 1, id: 12345},
                    {status: 1, id: 34567},
                ],
                2: [
                    {status: 2, id: 23456},
                ],
                4: [
                    {status: 4, id: 45678},
                ],
            });
        });

        it('Should automatically filter out any entry that isnt an object or is an empty object', () => {
            assert.deepEqual(groupBy([
                {status: 1, id: 12345},
                {status: 2, id: 23456},
                {status: 1, id: 34567},
                ...CONSTANTS.NOT_OBJECT_WITH_EMPTY,
                {status: 4, id: 45678},
            ], 'status'), {
                1: [
                    {status: 1, id: 12345},
                    {status: 1, id: 34567},
                ],
                2: [
                    {status: 2, id: 23456},
                ],
                4: [
                    {status: 4, id: 45678},
                ],
            });
        });
    });

    describe('function', () => {
        it('Returns object with all entries mapped to _ when none of the objects return handler key', () => {
            assert.deepEqual(groupBy([
                {status: 1, id: 12345},
                {status: 2, id: 23456},
                {status: 1, id: 34567},
                {status: 4, id: 45678},
                /* @ts-ignore */
            ], el => el.role), {_: [
                {status: 1, id: 12345},
                {status: 2, id: 23456},
                {status: 1, id: 34567},
                {status: 4, id: 45678},
            ]});
        });

        it('Returns object with all entries mapped correctly when some objects have key and some dont', () => {
            assert.deepEqual(groupBy([
                {status: 1, id: 12345},
                {id: 23456},
                {status: 1, id: 34567},
                {status: 4, id: 45678},
            ], el => el.status), {
                _: [
                    {id: 23456},
                ],
                1: [
                    {status: 1, id: 12345},
                    {status: 1, id: 34567},
                ],
                4: [
                    {status: 4, id: 45678},
                ],
            });
        });

        it('Returns object with all entries mapped when all objects have key', () => {
            assert.deepEqual(groupBy([
                {status: 1, id: 12345},
                {status: 2, id: 23456},
                {status: 1, id: 34567},
                {status: 4, id: 45678},
            ], el => el.status), {
                1: [
                    {status: 1, id: 12345},
                    {status: 1, id: 34567},
                ],
                2: [
                    {status: 2, id: 23456},
                ],
                4: [
                    {status: 4, id: 45678},
                ],
            });
        });

        it('Should automatically filter out any entry that isnt an object or is an empty object', () => {
            assert.deepEqual(groupBy([
                {status: 1, id: 12345},
                {status: 2, id: 23456},
                {status: 1, id: 34567},
                ...CONSTANTS.NOT_OBJECT_WITH_EMPTY,
                {status: 4, id: 45678},
            ], el => el.status), {
                1: [
                    {status: 1, id: 12345},
                    {status: 1, id: 34567},
                ],
                2: [
                    {status: 2, id: 23456},
                ],
                4: [
                    {status: 4, id: 45678},
                ],
            });
        });

        describe('return:string', () => {
            it('Should work correctly when all objects have the key', () => {
                assert.deepEqual(groupBy([
                    {status: 1, id: 12345, role: 'user'},
                    {status: 2, id: 23456, role: 'admin'},
                    {status: 1, id: 34567, role: 'owner'},
                    ...CONSTANTS.NOT_OBJECT_WITH_EMPTY,
                    {status: 4, id: 45678, role: 'owner'},
                ], el => el.role), {
                    user: [
                        {status: 1, id: 12345, role: 'user'},
                    ],
                    admin: [
                        {status: 2, id: 23456, role: 'admin'},
                    ],
                    owner: [
                        {status: 1, id: 34567, role: 'owner'},
                        {status: 4, id: 45678, role: 'owner'},
                    ],
                });
            });

            it('Should work correctly when some objects have the key', () => {
                assert.deepEqual(groupBy([
                    {status: 1, id: 12345, role: 'user'},
                    {status: 2, id: 23456},
                    {status: 1, id: 34567, role: 'owner'},
                    ...CONSTANTS.NOT_OBJECT_WITH_EMPTY,
                    {status: 4, id: 45678, role: 'owner'},
                ], el => el.role), {
                    _: [
                        {status: 2, id: 23456},
                    ],
                    user: [
                        {status: 1, id: 12345, role: 'user'},
                    ],
                    owner: [
                        {status: 1, id: 34567, role: 'owner'},
                        {status: 4, id: 45678, role: 'owner'},
                    ],
                });
            });

            it('Should work correctly when some objects have the key but function returns fallback', () => {
                assert.deepEqual(groupBy([
                    {status: 1, id: 12345, role: 'user'},
                    {status: 2, id: 23456},
                    {status: 1, id: 34567, role: 'owner'},
                    ...CONSTANTS.NOT_OBJECT_WITH_EMPTY,
                    {status: 4, id: 45678, role: 'owner'},
                ], el => el.role || 'other'), {
                    other: [
                        {status: 2, id: 23456},
                    ],
                    user: [
                        {status: 1, id: 12345, role: 'user'},
                    ],
                    owner: [
                        {status: 1, id: 34567, role: 'owner'},
                        {status: 4, id: 45678, role: 'owner'},
                    ],
                });
            });

            it('Should work correctly when all objects have the key but some set to empty string and fallback in function', () => {
                assert.deepEqual(groupBy([
                    {status: 1, id: 12345, role: 'user'},
                    {status: 2, id: 23456, role: ''},
                    {status: 1, id: 34567, role: 'owner'},
                    ...CONSTANTS.NOT_OBJECT_WITH_EMPTY,
                    {status: 4, id: 45678, role: 'owner'},
                ], el => el.role || 'other'), {
                    other: [
                        {status: 2, id: 23456, role: ''},
                    ],
                    user: [
                        {status: 1, id: 12345, role: 'user'},
                    ],
                    owner: [
                        {status: 1, id: 34567, role: 'owner'},
                        {status: 4, id: 45678, role: 'owner'},
                    ],
                });
            });

            it('Should work correctly when some objects have the key but function has no fallback', () => {
                assert.deepEqual(groupBy([
                    {status: 1, id: 12345, role: 'user'},
                    {status: 2, id: 23456},
                    {status: 1, id: 34567, role: 'owner'},
                    ...CONSTANTS.NOT_OBJECT_WITH_EMPTY,
                    {status: 4, id: 45678, role: 'owner'},
                ], el => el.role), {
                    _: [
                        {status: 2, id: 23456},
                    ],
                    user: [
                        {status: 1, id: 12345, role: 'user'},
                    ],
                    owner: [
                        {status: 1, id: 34567, role: 'owner'},
                        {status: 4, id: 45678, role: 'owner'},
                    ],
                });
            });

            it('Should work correctly when all objects have the key but some set to empty string and no fallback in function', () => {
                assert.deepEqual(groupBy([
                    {status: 1, id: 12345, role: 'user'},
                    {status: 2, id: 23456, role: ''},
                    {status: 1, id: 34567, role: 'owner'},
                    ...CONSTANTS.NOT_OBJECT_WITH_EMPTY,
                    {status: 4, id: 45678, role: 'owner'},
                ], el => el.role), {
                    _: [
                        {status: 2, id: 23456, role: ''},
                    ],
                    user: [
                        {status: 1, id: 12345, role: 'user'},
                    ],
                    owner: [
                        {status: 1, id: 34567, role: 'owner'},
                        {status: 4, id: 45678, role: 'owner'},
                    ],
                });
            });
        });

        describe('return:boolean', () => {
            it('Should work correctly when all objects have the key', () => {
                assert.deepEqual(groupBy([
                    {status: false, id: 12345, role: 'user'},
                    {status: true, id: 23456, role: 'admin'},
                    {status: true, id: 34567, role: 'owner'},
                    ...CONSTANTS.NOT_OBJECT_WITH_EMPTY,
                    {status: false, id: 45678, role: 'owner'},
                ], el => el.status), {
                    false: [
                        {status: false, id: 12345, role: 'user'},
                        {status: false, id: 45678, role: 'owner'},
                    ],
                    true: [
                        {status: true, id: 23456, role: 'admin'},
                        {status: true, id: 34567, role: 'owner'},
                    ],
                });
            });

            it('Should work correctly when some objects have the key', () => {
                assert.deepEqual(groupBy([
                    {status: false, id: 12345, role: 'user'},
                    {id: 23456, role: 'admin'},
                    {status: true, id: 34567, role: 'owner'},
                    ...CONSTANTS.NOT_OBJECT_WITH_EMPTY,
                    {status: false, id: 45678, role: 'owner'},
                ], el => el.status), {
                    _: [
                        {id: 23456, role: 'admin'},
                    ],
                    false: [
                        {status: false, id: 12345, role: 'user'},
                        {status: false, id: 45678, role: 'owner'},
                    ],
                    true: [
                        {status: true, id: 34567, role: 'owner'},
                    ],
                });
            });

            it('Should work correctly when some objects have the key but function returns fallback', () => {
                assert.deepEqual(groupBy([
                    {status: false, id: 12345, role: 'user'},
                    {id: 23456, role: 'admin'},
                    {status: true, id: 34567, role: 'owner'},
                    ...CONSTANTS.NOT_OBJECT_WITH_EMPTY,
                    {status: false, id: 45678, role: 'owner'},
                ], el => el.status || 'other'), {
                    other: [
                        {status: false, id: 12345, role: 'user'},
                        {id: 23456, role: 'admin'},
                        {status: false, id: 45678, role: 'owner'},
                    ],
                    true: [
                        {status: true, id: 34567, role: 'owner'},
                    ],
                });
            });
        });

        describe('return:number', () => {
            it('Should work correctly when all objects have the key', () => {
                assert.deepEqual(groupBy([
                    {status: 1, id: 12345, role: 'user'},
                    {status: 2, id: 23456, role: 'admin'},
                    {status: 2, id: 34567, role: 'owner'},
                    ...CONSTANTS.NOT_OBJECT_WITH_EMPTY,
                    {status: 1, id: 45678, role: 'owner'},
                ], el => el.status), {
                    1: [
                        {status: 1, id: 12345, role: 'user'},
                        {status: 1, id: 45678, role: 'owner'},
                    ],
                    2: [
                        {status: 2, id: 23456, role: 'admin'},
                        {status: 2, id: 34567, role: 'owner'},
                    ],
                });
            });

            it('Should work correctly when some objects have the key', () => {
                assert.deepEqual(groupBy([
                    {status: 1, id: 12345, role: 'user'},
                    {id: 23456, role: 'admin'},
                    {status: 2, id: 34567, role: 'owner'},
                    ...CONSTANTS.NOT_OBJECT_WITH_EMPTY,
                    {status: 1, id: 45678, role: 'owner'},
                ], el => el.status), {
                    _: [
                        {id: 23456, role: 'admin'},
                    ],
                    1: [
                        {status: 1, id: 12345, role: 'user'},
                        {status: 1, id: 45678, role: 'owner'},
                    ],
                    2: [
                        {status: 2, id: 34567, role: 'owner'},
                    ],
                });
            });

            it('Should work correctly when some objects have the key but function returns fallback', () => {
                assert.deepEqual(groupBy([
                    {status: 0, id: 12345, role: 'user'},
                    {id: 23456, role: 'admin'},
                    {status: 2, id: 34567, role: 'owner'},
                    ...CONSTANTS.NOT_OBJECT_WITH_EMPTY,
                    {status: 0, id: 45678, role: 'owner'},
                ], el => el.status || 'other'), {
                    other: [
                        {status: 0, id: 12345, role: 'user'},
                        {id: 23456, role: 'admin'},
                        {status: 0, id: 45678, role: 'owner'},
                    ],
                    2: [
                        {status: 2, id: 34567, role: 'owner'},
                    ],
                });
            });
        });
    });
});
