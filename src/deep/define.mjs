'use strict';

import deepSet from './set.mjs';

export default function deepDefine (obj, path, value = null) {
    return deepSet(obj, path, value, true);
}
