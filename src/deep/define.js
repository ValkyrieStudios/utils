'use strict';

import deepSet from './set';

export default function (obj, path, value = null) {
    return deepSet(obj, path, value, true);
}
