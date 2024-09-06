type MergeOptions = {
    /**
     * Defaults to false, when passed as true it ensures all keys from both objects
     * are available in the merged object
     */
    union?: boolean;
}

const PROTO_OBJ = '[object Object]';

function innerMerge (target:{[key:string]:any},source:{[key:string]:any}, UNION:boolean) {
    const origin = UNION ? source : target;
    for (const key in origin) {
        const t_key = target[key];
        const s_key = source[key];
        if (
            Object.prototype.toString.call(t_key) === PROTO_OBJ &&
            Object.prototype.toString.call(s_key) === PROTO_OBJ
        ) {
            target[key] = innerMerge({...t_key}, s_key, UNION);
        } else {
            target[key] = s_key !== undefined ? s_key : t_key;
        }
    }

    return target;
}

/**
 * Deep merge two objects together while ensuring nested objects also get merged,
 * take note: this does not merge onto passed objects by reference but instead
 * returns a new object
 *
 * @param {Record<string,any>} target - Base Object
 * @param {Record<string,any>|Record<string,any>[]} source - (default={}) Object to merge onto base object
 */
function merge (
    target:Record<string, any>,
    source:Record<string, any>|Record<string,any>[] = {},
    opts: MergeOptions  = {}
):Record<string, any> {
    if (
        Object.prototype.toString.call(target) !== PROTO_OBJ
    ) throw new Error('object/merge: Please ensure valid target/source is passed');

    /* Define union */
    const union = opts?.union === true;

    /* Get sources array */
    const sources = Array.isArray(source) ? source : [source];

    /* Merge */
    let  acc = {...target};
    for (let i = 0; i < sources.length; i++) {
        const el = sources[i];
        if (Object.prototype.toString.call(el) !== PROTO_OBJ) continue;
        acc = innerMerge(acc, el, union);
    }

    return acc;
}

export {merge, merge as default};
