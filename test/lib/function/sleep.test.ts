import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import sleep            from '../../../lib/function/sleep';

describe('Function - sleep', () => {
    it('Return new Promise', () => {
        const prom = sleep();
        assert.ok(prom instanceof Promise);
    });

    it('Returns a promise that resolves', async () => {
        let is_resolved = false;
        await sleep().then(() => is_resolved = true, () => {}).catch(() => {});
        assert.ok(is_resolved);
    });

    it('Resolves after the provided time', async () => {
        const timer_start = new Date();
        await sleep(205);
        const timer_end = new Date().getTime() - timer_start.getTime();
        assert.ok(timer_end >= 200);
    });

    it('Resolves immediately if provided time is smaller than 0', async () => {
        const timer_start = new Date();
        await sleep(-1);
        const timer_end = new Date().getTime() - timer_start.getTime();
        assert.ok(timer_end <= 5);
    });
});
