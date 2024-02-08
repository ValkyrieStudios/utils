'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import noopresolve      from '../../../lib/function/noopresolve';

describe('Function - noopresolve', () => {
    it('Return new Promise', () => {
        //  @ts-ignore
        const prom = noopresolve();
        assert.ok(prom instanceof Promise);
    });

    it('Returns a promise that resolved', async () => {
        let is_resolved = false;
        await noopresolve().then(() => is_resolved = true, () => {}).catch(() => {});
        assert.ok(is_resolved);
    });

    it('Resolving the promise returns passed variable', async () => {
        const out = await noopresolve(56);
        assert.equal(out, 56);
    });
});
