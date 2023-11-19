'use strict';

import {describe, it}       from 'node:test';
import assert               from 'node:assert/strict';
import CONSTANTS, {getTime} from '../../constants.js';
import guid                 from '../../../src/hash/guid.js';

describe('Hash - guid', () => {
    it('Output a string value', () => {
        assert.equal(typeof guid(), 'string');
    });

    it('Have exactly 36 characters', () => {
        assert.equal(guid().length, 36);
    });

    it('Match the rfc4122 spec', () => {
        assert.ok(/^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/g.test(guid()));
    });

    it('Be unique (50.000 benchmark)', () => {
        const map = new Map();
        let cursor = 0;
        while (cursor < 50000) {
            map.set(guid(), true);
            cursor++;
        }
        assert.ok(map.size === cursor);
    });

    it('Be fast (50.000 benchmark) < 50ms', () => {
        const start_time = getTime();
        let cursor = 0;
        while (cursor < 50000) {
            guid();
            cursor++;
        }
        assert.ok((getTime() - start_time) < 50);
    });

    it('Be unique (100.000 benchmark)', () => {
        const map = new Map();
        let cursor = 0;
        while (cursor < 100000) {
            map.set(guid(), true);
            cursor++;
        }
        assert.ok(map.size === cursor);
    });

    it('Be fast (100.000 benchmark) < 100ms', () => {
        const start_time = getTime();
        let cursor = 0;
        while (cursor < 100000) {
            guid();
            cursor++;
        }
        assert.ok((getTime() - start_time) < 100);
    });

    it('Be unique (200.000 benchmark)', () => {
        const map = new Map();
        let cursor = 0;
        while (cursor < 200000) {
            map.set(guid(), true);
            cursor++;
        }
        assert.ok(map.size === cursor);
    });

    it('Be fast (200.000 benchmark) < 200ms', () => {
        const start_time = getTime();
        let cursor = 0;
        while (cursor < 200000) {
            guid();
            cursor++;
        }
        assert.ok((getTime() - start_time) < 200);
    });
});
