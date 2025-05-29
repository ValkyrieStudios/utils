import {bench, describe} from 'vitest';
import guid from '../../../lib/hash/guid';

describe('Benchmark: guid vs crypto.randomUUID', () => {
    bench('Custom guid()', () => {
        guid();
    });

    bench('crypto.randomUUID()', () => {
        crypto.randomUUID();
    });
});
