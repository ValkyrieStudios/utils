'use strict';

import isNotEmptyArray from './isNotEmpty';

//  Fisher - Yates shuffle O(n)
//  https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
//
//  @param array    arr     Array to shuffle
export default function shuffle (arr) {
    if (!isNotEmptyArray(arr)) return;

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));  // Random index from 0 to i
        [arr[i], arr[j]] = [arr[j], arr[i]];            // Swap elements
    }
}
