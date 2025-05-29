import {bench, describe} from 'vitest';
import memoize from '../../../lib/caching/memoize';
import fnv1A from '../../../lib/hash/fnv1A';

function hashFn(a: string) {
    return fnv1A(`${a}`);
}

const memoizedHashFn = memoize(hashFn);

const cases = [
    'aeywuqieiwqyeqw9374589236748974890237432',
    'bdjsahfjkhdsffjoihfihriofherwoirtuweroi',
    'ci4908239045734 h5;3h59085903470583405',
    'dvcmvkljiopfklfwdj iolfjeiwpie',
    'eeiwuo7809432538245834905 8 54543',
    'f,cvmmklfjpfe482390 7hjnofjwehdoirujier',
    '58934059348g4230-489230-94 0-2394-23049-2',
];

describe('memoize vs non-memoized', () => {
    bench('non-memoized function', () => {
        const randomIndex = Math.floor(Math.random() * cases.length);
        hashFn(cases[randomIndex]);
    });

    bench('memoized function', () => {
        const randomIndex = Math.floor(Math.random() * cases.length);
        memoizedHashFn(cases[randomIndex]);
    });
});
