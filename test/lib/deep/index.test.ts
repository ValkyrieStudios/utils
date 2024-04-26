'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import * as LibDeep     from '../../../lib/deep';
import deepFreeze       from '../../../lib/deep/freeze';
import deepGet          from '../../../lib/deep/get';
import deepSeal         from '../../../lib/deep/seal';
import deepSet          from '../../../lib/deep/set';

describe('Deep - *', () => {
    it('Should be a correct export', () => {
        assert.deepEqual(LibDeep, {
            deepFreeze,
            deepGet,
            deepSeal,
            deepSet,
            freeze: deepFreeze,
            get: deepGet,
            seal: deepSeal,
            set: deepSet,
        });
    });
});
