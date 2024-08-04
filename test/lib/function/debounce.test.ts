import {describe, it} from 'node:test';
import * as assert from 'node:assert/strict';
import debounce from '../../../lib/function/debounce';
import sleep from '../../../lib/function/sleep';
import CONSTANTS from '../../constants';

describe('Utils - debounce', () => {
    it('Should be a function', () => {
        assert.equal(typeof debounce, 'function');
    });

    it('Should return a function', () => {
        const debounced = debounce(() => {}, 100);
        assert.equal(typeof debounced, 'function');
    });

    it('Should throw if function is not a function', () => {
        for (const el of CONSTANTS.NOT_FUNCTION) {
            assert.throws(
                () => debounce(el, 20),
                new Error('functions/debounce: Expected a function')
            );
        }
    });

    it('Should throw if wait is not an integer or not above 0', () => {
        for (const el of [...CONSTANTS.NOT_INTEGER, 0, -10]) {
            assert.throws(
                () => debounce(() => {}, el),
                new Error('functions/debounce: Wait should be an integer above 0')
            );
        }
    });

    it('Should delay execution', async () => {
        let counter = 0;
        const increment = debounce(() => {
            counter += 1;
        }, 100);

        increment();
        assert.equal(counter, 0); // not yet called

        await sleep(50);
        assert.equal(counter, 0); // still not called

        await sleep(60);
        assert.equal(counter, 1); // now called
    });

    it('Should cancel delayed execution', async () => {
        let counter = 0;
        const increment = debounce(() => {
            counter += 1;
        }, 100);

        increment();
        assert.equal(counter, 0);

        increment.cancel();
        await sleep(100);
        assert.equal(counter, 0); // not called because of cancel
    });

    it('Should flush delayed execution', async () => {
        let counter = 0;
        const increment = debounce(() => {
            counter += 1;
        }, 100);

        increment();
        assert.equal(counter, 0);

        increment.flush();
        await sleep(1);
        assert.equal(counter, 1); // called immediately because of flush
    });

    it('Should reset timer if called multiple times within wait period', async () => {
        let counter = 0;
        const increment = debounce(() => {
            counter += 1;
        }, 100);

        increment();
        await sleep(50);
        increment();
        await sleep(50);
        increment();
        await sleep(50);
        assert.equal(counter, 0); // not yet called

        await sleep(60);
        assert.equal(counter, 1); // called once
    });
});
