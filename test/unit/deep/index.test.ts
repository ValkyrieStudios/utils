import {describe, it, expect} from 'vitest';
import * as LibDeep from '../../../lib/deep';
import deepFreeze from '../../../lib/deep/freeze';
import deepGet from '../../../lib/deep/get';
import deepSeal from '../../../lib/deep/seal';
import deepSet from '../../../lib/deep/set';

describe('Deep - *', () => {
    it('Should be a correct export', () => {
        expect(LibDeep.deepFreeze).toEqual(deepFreeze);
        expect(LibDeep.deepGet).toEqual(deepGet);
        expect(LibDeep.deepSeal).toEqual(deepSeal);
        expect(LibDeep.deepSet).toEqual(deepSet);
        expect(LibDeep.freeze).toEqual(deepFreeze);
        expect(LibDeep.get).toEqual(deepGet);
        expect(LibDeep.seal).toEqual(deepSeal);
        expect(LibDeep.set).toEqual(deepSet);
    });
});
