import isObject     from '../object/is';
import isIntegerGt  from '../number/isIntegerAbove';

export type LRUCacheOptions = {
    /**
     * Maximum amount of entries the cache can have
     * (defaults to 100)
     */
    max_size?: number;
};

/**
 * Least-Recently-Used (LRU) Cache
 */
class LRUCache<K, V> {

    #cache: Map<K, V>;

    #max_size: number;

    constructor (opts:LRUCacheOptions = {}) {
        const {max_size = 100} = isObject(opts) ? opts : {};

        this.#cache = new Map<K, V>();
        this.#max_size = isIntegerGt(max_size, 0) ? max_size : 100;
    }

    /**
     * Get the currently configured max size of the cache
     */
    get max_size () {
        return this.#max_size;
    }

    /**
     * Reconfigure the max size of the cache
     *
     * @param {number} max_size - New max size
     */
    set max_size (max_size: number) {
        if (!isIntegerGt(max_size, 0)) throw new Error('max_size must be a positive integer');

        this.#max_size = max_size;
        if (this.#cache.size > max_size) {
            const excess = this.#cache.size - max_size;
            const keys = [...this.#cache.keys()];
            for (let i = 0; i < excess; i++) {
                this.#cache.delete(keys[i]);
            }
        }
    }

    /**
     * Returns whether or not a key exists in cache
     *
     * @param {K} key - Key to retrieve
     */
    has (key: K):boolean {
        return this.#cache.has(key);
    }

    /**
     * Retrieves a value from the cache
     *
     * @param {K} key - Key to retrieve
     * @returns {V | undefined} Either the found value or undefined
     */
    get (key: K): V | undefined {
        const value = this.#cache.get(key);
        if (value === undefined) return undefined;

        /* Delete from cache */
        this.#cache.delete(key);

        /**
         * Re-insert into cache, map keys work with insertion-order,
         * as such the least recently used entries' keys will eventually get deleted
         */
        this.#cache.set(key, value);

        return value;
    }

    /**
     * Sets a value on to the cache
     *
     * @param {K} key - Key to set
     * @param {V} value - Value to set for the key
     */
    set (key: K, value: V) {
        if (this.#cache.has(key)) {
            this.#cache.delete(key);
        } else if (this.#cache.size >= this.max_size) {
            this.#cache.delete(this.#cache.keys().next().value!);
        }

        this.#cache.set(key, value);
    }

    /**
     * Removes a single value from the cache
     *
     * @param {K} key - Key to remove
     */
    del (key: K) {
        if (key === undefined || !this.#cache.has(key)) return;
        this.#cache.delete(key);
    }

    /**
     * Clears all contents of the cache
     */
    clear () {
        this.#cache.clear();
    }

}

export {LRUCache, LRUCache as default};
