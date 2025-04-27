/* Aliases needed - import first */
import {LRUCache} from './LRU';

/* 1:1 Re-exports */
export {memoize} from './memoize';

/* Manual export block for aliasing */
export {
    LRUCache,
    LRUCache as LRU
};
