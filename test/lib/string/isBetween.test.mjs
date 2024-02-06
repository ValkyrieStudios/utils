'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import isStringBetween  from '../../../lib/string/isBetween.mjs';

describe('String - isStringBetween', () => {
    it('Not see a non-string as a string between', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            assert.equal(isStringBetween(el, 0, 1000), false);
        }
    });

    it('Returns false when passing a non-numeric min or min below 0', () => {
        for (const el of [...CONSTANTS.NOT_NUMERIC, -1]) {
            assert.equal(isStringBetween('hello', el, 1000), false);
        }
    });

    it('Returns false when passing a non-numeric max or max below 0', () => {
        for (const el of [...CONSTANTS.NOT_NUMERIC, -1]) {
            assert.equal(isStringBetween('hello', 0, el), false);
        }
    });

    it('Treat string values between ranges correctly', () => {
        for (const el of [
            ['Hi', 1, 5],
            ['', 0, 1],
            ['Hello world!', 1, 13],
        ]) assert.ok(isStringBetween(el[0], el[1], el[2]));
    });

    it('Treat string values between ranges with invalid values incorrectly', () => {
        for (const el of [
            ['Hi', 1, 5],
            ['', 0, 1],
            ['Hello world!', 1, 13],
        ]) assert.equal(isStringBetween(el[0], `${el[1]}`, el[2]), false);
        for (const el of [
            ['Hi', 1, 5],
            ['', 0, 1],
            ['Hello world!', 1, 13],
        ]) assert.equal(isStringBetween(el[0], el[1], `${el[2]}`), false);
    });

    it('Treat string values below lower bound as false', () => {
        for (const el of [
            ['Peter', 8, 100],
            ['', 1, 50],
        ]) assert.equal(isStringBetween(el[0], el[1], el[2]), false);
    });

    it('Treat string values at lower bound as true', () => {
        for (const el of [
            ['Peter', 5, 100],
            ['', 0, 50],
        ]) assert.ok(isStringBetween(el[0], el[1], el[2]));
    });

    it('Treat string values above upper bound as false', () => {
        for (const el of [
            ['Peters Magic Castle', 5, 18],
            ['foo', 0, 2],
        ]) assert.equal(isStringBetween(el[0], el[1], el[2]), false);
    });

    it('Treat string values at upper bound as true', () => {
        for (const el of [
            ['Peters Magic Castle', 5, 19],
            ['foo', 0, 3],
        ]) assert.ok(isStringBetween(el[0], el[1], el[2]));
    });

    it('Returns false when passed a min that is higher than max', () => {
        assert.equal(isStringBetween('Hello there', 15, 10), false);
    });

    it('Returns false when passed a min that is equal to max', () => {
        assert.equal(isStringBetween('Hello there', 9, 9), false);
    });

    it('autotrims string values', () => {
        for (const el of [
            ['   foo   ', 0, 3],
        ]) assert.ok(isStringBetween(el[0], el[1], el[2]));
    });

    it('does not autotrim string values when overriding default', () => {
        for (const el of [
            ['   foo   ', 0, 3],
        ]) assert.equal(isStringBetween(el[0], el[1], el[2], false), false);
    });
});
