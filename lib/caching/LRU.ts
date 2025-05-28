import isObject     from '../object/is';
import isIntegerGt  from '../number/isIntegerAbove';

type LRUNode< V> = {
    key:string;
    value:V;
    prev:LRUNode< V> | null;
    next:LRUNode< V> | null;
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

    #map:Record<string, LRUNode<V>>;

    #head:LRUNode<V> | null = null;

    #tail:LRUNode<V> | null = null;

    #max_size:number;

    #size:number = 0;

    constructor (opts:LRUCacheOptions = {}) {
        const {max_size = 100} = isObject(opts) ? opts : {};

        this.#map = Object.create(null);
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
    has (key:string):boolean {
        return key in this.#map;
    }

    /**
     * Retrieves a value from the cache
     *
     * @param {string} key - Key to retrieve
     */
    get (key:string):V|undefined {
        const node = this.#map[key];
        if (!node) return undefined;

        this.moveToFront(node);
        return node.value;
    }

    /**
     * Sets a value on to the cache
     *
     * @param {string} key - Key to set
     * @param {V} value - Value to set for the key
     */
    set (key:string, value: V): void {
        let node = this.#map[key];

        if (node !== undefined) {
            node.value = value;
            this.moveToFront(node);
        } else {
            node = {key, value, prev: null, next: null};
            this.#map[key] = node;
            this.addToFront(node);
            this.#size++;

            if (this.#tail && this.#size > this.#max_size) {
                this.evictTail();
            }
        }
    }

    /**
     * Removes a single value from the cache
     *
     * @param {string} key - Key to remove
     */
    del (key:string) {
        const node = this.#map[key];
        if (!node) return;

        this.removeNode(node);
        delete this.#map[key];
        this.#size--;
    }

    /**
     * Clears all contents of the cache
     */
    clear () {
        this.#map = Object.create(null);
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
    }

    /**
     * MARK: Private
     */

    private addToFront (node:LRUNode<V>):void {
        node.next = this.#head;
        node.prev = null;

        if (this.#head) {
            this.#head.prev = node;
        }
        this.#head = node;

        if (!this.#tail) {
            this.#tail = node;
        }
    }

    private removeNode (node:LRUNode<V>):void {
        if (node.prev) node.prev.next = node.next;
        else this.#head = node.next;

        if (node.next) node.next.prev = node.prev;
        else this.#tail = node.prev;

        node.prev = null;
        node.next = null;
    }

    private moveToFront (node:LRUNode<V>):void {
        if (this.#head === node) return;
        this.removeNode(node);
        this.addToFront(node);
    }

    private evictTail (): void {
        const old_tail = this.#tail!;
        this.removeNode(old_tail);
        delete this.#map[old_tail.key];
        this.#size--;
    }

}

export {LRUCache, LRUCache as default};
