import {describe, it, expect} from 'vitest';
import * as LibHash from '../../../lib/hash';
import djb2 from '../../../lib/hash/djb2';
import fnv1A from '../../../lib/hash/fnv1A';
import guid from '../../../lib/hash/guid';

describe('Hash - *', () => {
    it('Should be a correct export', () => {
        expect(LibHash.djb2).toEqual(djb2);
        expect(LibHash.fnv1A).toEqual(fnv1A);
        expect(LibHash.guid).toEqual(guid);
    });
});
