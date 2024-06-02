import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import guid             from '../../../lib/hash/guid';

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
        const set = new Set();
        let cursor = 0;
        while (cursor < 50000) {
            set.add(guid());
            cursor++;
        }
        assert.ok(set.size === cursor);
    });

    it('Be unique (100.000 benchmark)', () => {
        const set = new Set();
        let cursor = 0;
        while (cursor < 100000) {
            set.add(guid());
            cursor++;
        }
        assert.ok(set.size === cursor);
    });

    it('Be unique (200.000 benchmark)', () => {
        const set = new Set();
        let cursor = 0;
        while (cursor < 200000) {
            set.add(guid());
            cursor++;
        }
        assert.ok(set.size === cursor);
    });
});
