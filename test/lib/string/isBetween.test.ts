'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import isStringBetween  from '../../../lib/string/isBetween';

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
            {v: 'Hi', min: 1, max: 5},
            {v: '', min: 0, max: 1},
            {v: 'Hello world!', min: 1, max: 13},
        ]) assert.ok(isStringBetween(el.v, el.min, el.max));
    });

    it('Treat string values between ranges with invalid values incorrectly', () => {
        for (const el of [
            {v: 'Hi', min: 1, max: 5},
            {v: '', min: 0, max: 1},
            {v: 'Hello world!', min: 1, max: 13},
        ]) {
            //  @ts-ignore
            assert.equal(isStringBetween(el.v, `${el.min}`, el.max), false);
            //  @ts-ignore
            assert.equal(isStringBetween(el.v, el.min, `${el.max}`), false);
        }
    });

    it('Treat string values below lower bound as false', () => {
        for (const el of [
            {v: 'Peter', min: 8, max: 100},
            {v: '', min: 1, max: 50},
        ]) assert.equal(isStringBetween(el.v, el.min, el.max), false);
    });

    it('Treat string values at lower bound as true', () => {
        for (const el of [
            {v: 'Peter', min: 5, max: 100},
            {v: '', min: 0, max: 50},
        ]) assert.ok(isStringBetween(el.v, el.min, el.max));
    });

    it('Treat string values above upper bound as false', () => {
        for (const el of [
            {v: 'Peters Magic Castle', min: 5, max: 18},
            {v: 'foo', min: 0, max: 2},
        ]) assert.equal(isStringBetween(el.v, el.min, el.max), false);
    });

    it('Treat string values at upper bound as true', () => {
        for (const el of [
            {v: 'Peters Magic Castle', min: 5, max: 19},
            {v: 'foo', min: 0, max: 3},
        ]) assert.ok(isStringBetween(el.v, el.min, el.max));
    });

    it('Returns false when passed a min that is higher than max', () => {
        assert.equal(isStringBetween('Hello there', 15, 10), false);
    });

    it('Returns false when passed a min that is equal to max', () => {
        assert.equal(isStringBetween('Hello there', 9, 9), false);
    });

    it('autotrims string values', () => {
        assert.ok(isStringBetween('   foo   ', 0, 3));
    });

    it('does not autotrim string values when overriding default', () => {
        assert.equal(isStringBetween('   foo   ', 0, 3, false), false);
    });
});
