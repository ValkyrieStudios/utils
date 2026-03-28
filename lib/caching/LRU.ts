import isObject     from '../object/is';
import isIntegerGt  from '../number/isIntegerAbove';

type LRUNode<V> = {
    key: string;
    value: V;
    prev: LRUNode<V> | null;
    next: LRUNode<V> | null;
};

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
class LRUCache<V> {

    #map: Map<string, LRUNode<V>>;

    #head: LRUNode<V> | null = null;

    #tail: LRUNode<V> | null = null;

    #max_size: number;

    #size: number = 0;

    constructor (opts: LRUCacheOptions = {}) {
        const {max_size = 100} = isObject(opts) ? opts : {};

        this.#map = new Map();
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
        while (this.#size > max_size) this.evictTail();
    }

    /**
     * Returns whether or not a key exists in cache
     *
     * @param {string} key - Key to retrieve
     */
    has (key: string): boolean {
        return this.#map.has(key);
    }

    /**
     * Retrieves a value from the cache
     *
     * @param {string} key - Key to retrieve
     */
    get (key: string): V | undefined {
        const node = this.#map.get(key);
        if (node === undefined) return undefined;

        // Don't run linked list logic if it's already the head
        if (this.#head !== node) this.moveToFront(node);
        return node.value;
    }

    /**
     * Sets a value on to the cache
     *
     * @param {string} key - Key to set
     * @param {V} value - Value to set for the key
     */
    set (key: string, value: V): void {
        let node = this.#map.get(key);

        if (node !== undefined) {
            node.value = value;
            if (this.#head !== node) {
                this.moveToFront(node);
            }
        } else if (this.#size >= this.#max_size && this.#tail !== null) {
            node = this.#tail;
            this.#map.delete(node.key); // Remove old key mapping

            node.key = key;             // Recycle the object
            node.value = value;

            this.#map.set(key, node);
            this.moveToFront(node);
        } else {
            node = {key, value, prev: null, next: null};
            this.#map.set(key, node);
            this.addToFront(node);
            this.#size++;
        }
    }

    /**
     * Removes a single value from the cache
     *
     * @param {string} key - Key to remove
     */
    del (key: string) {
        const node = this.#map.get(key);
        if (node === undefined) return;

        this.removeNode(node);
        this.#map.delete(key);
        this.#size--;
    }

    /**
     * Clears all contents of the cache
     */
    clear () {
        this.#map.clear();
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
    }

    /**
     * MARK: Private
     */

    private addToFront (node: LRUNode<V>): void {
        node.next = this.#head;
        node.prev = null;

        if (this.#head !== null) {
            this.#head.prev = node;
        }
        this.#head = node;

        if (this.#tail === null) {
            this.#tail = node;
        }
    }

    private removeNode (node: LRUNode<V>): void {
        if (node.prev !== null) node.prev.next = node.next;
        else this.#head = node.next;

        if (node.next !== null) node.next.prev = node.prev;
        else this.#tail = node.prev;

        node.prev = null;
        node.next = null;
    }

    private moveToFront (node: LRUNode<V>): void {
        this.removeNode(node);
        this.addToFront(node);
    }

    private evictTail (): void {
        if (this.#tail === null) return;
        const old_tail = this.#tail;
        this.removeNode(old_tail);
        this.#map.delete(old_tail.key);
        this.#size--;
    }

}

export {LRUCache, LRUCache as default};
