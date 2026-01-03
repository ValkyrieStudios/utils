import {toString} from './utils';

/**
 * DJB2 Hash implementation
 *
 * @param {unknown} data - Value to hash
 */
function djb2 (data: unknown):string {
    let hash = 5381;
    const normalized = toString(data);
    const len = normalized.length;

    for (let i = 0; i < len; i++) {
        hash = ((hash << 5) + hash) ^ normalized.charCodeAt(i);
    }

    // Force unsigned 32-bit integer conversion
    return (hash >>> 0).toString();
}

export {djb2, djb2 as default};
