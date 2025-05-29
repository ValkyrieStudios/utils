import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import define from '../../../lib/object/define';

describe('Object - define', () => {
    it('Throws when passing a non-object props', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            expect(() => define(el, {})).toThrow(new TypeError('Please pass an object as the value for props and obj'));
        }
    });

    it('Throws when passing a non-object obj', () => {
        for (const el of CONSTANTS.NOT_OBJECT) {
            if (el === undefined) continue;
            expect(() => define({}, el)).toThrow(new TypeError('Please pass an object as the value for props and obj'));
        }
    });

    it('Returns the same object when called with an empty properties object', () => {
        expect(define({}, {a: 1})).toEqual({a: 1});
    });

    it('defines properties that are passed without passing an existing object', () => {
        const obj = define({
            a: {
                configurable: true,
                get: () => 1,
            },
            b: {
                configurable: true,
                value: () => 2,
            },
        });
        // @ts-ignore
        expect(Object.getOwnPropertyDescriptor(obj, 'a').set).toBeUndefined();
        // @ts-ignore
        expect(typeof Object.getOwnPropertyDescriptor(obj, 'a').get).toBe('function');
        // @ts-ignore
        expect(Object.getOwnPropertyDescriptor(obj, 'b').get).toBeUndefined();
        // @ts-ignore
        expect(Object.getOwnPropertyDescriptor(obj, 'b').set).toBeUndefined();
        // @ts-ignore
        expect(typeof Object.getOwnPropertyDescriptor(obj, 'b').value).toBe('function');

        expect(obj.a).toBe(1);
        expect(obj.b()).toBe(2);
    });

    it('defines properties that are passed on an existing object', () => {
        const obj = define({
            a: {
                configurable: true,
                get: () => 1,
            },
            b: {
                configurable: true,
                value: () => 2,
            },
        }, {c: 1});
        // @ts-ignore
        expect(Object.getOwnPropertyDescriptor(obj, 'a').set).toBeUndefined();
        // @ts-ignore
        expect(typeof Object.getOwnPropertyDescriptor(obj, 'a').get).toBe('function');
        // @ts-ignore
        expect(Object.getOwnPropertyDescriptor(obj, 'b').get).toBeUndefined();
        // @ts-ignore
        expect(Object.getOwnPropertyDescriptor(obj, 'b').set).toBeUndefined();
        // @ts-ignore
        expect(typeof Object.getOwnPropertyDescriptor(obj, 'b').value).toBe('function');

        expect(obj.a).toBe(1);
        expect(obj.b()).toBe(2);
        expect(obj.c).toBe(1);
    });

    it('defines properties that are passed on an existing object', () => {
        const obj = define({
            a: {
                configurable: true,
                get: () => 1,
            },
            b: {
                configurable: true,
                value: () => 2,
            },
        }, {a: 5});

        // @ts-ignore
        expect(Object.getOwnPropertyDescriptor(obj, 'a').set).toBeUndefined();
        // @ts-ignore
        expect(typeof Object.getOwnPropertyDescriptor(obj, 'a').get).toBe('function');
        // @ts-ignore
        expect(Object.getOwnPropertyDescriptor(obj, 'b').get).toBeUndefined();
        // @ts-ignore
        expect(Object.getOwnPropertyDescriptor(obj, 'b').set).toBeUndefined();
        // @ts-ignore
        expect(typeof Object.getOwnPropertyDescriptor(obj, 'b').value).toBe('function');

        expect(obj.a).toBe(1);
        expect(obj.b()).toBe(2);
    });
});
