'use strict';

//
//  GUID : [RFC4122 Compliant]
//

    let performance = false;

    if (typeof(window) !== 'undefined' && (window.performance || {}).now) {                 // eslint-disable-line no-undef
        performance = () => window.performance.now();                                       // eslint-disable-line no-undef
    } else if (typeof(process) !== 'undefined') {                                           // eslint-disable-line no-undef
        performance = () => process.hrtime()[1];                                            // eslint-disable-line no-undef
    } else {
        performance = () => 0;
    }

    export function guid () {
        //  According to : rfc4122
        let d = new Date().getTime();

        //use high-precision timer if available
        d += performance();

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (d + Math.random() * 16) % 16 | 0;

            d = Math.floor(d / 16);
            return (c === 'x'
                ? r
                : (r & 0x3 | 0x8)).toString(16);
        });
    }

//
//  MD5 : [RFC1321 Compliant]
//

    export function md5 (string) {
       function addUnsign(l_x, l_y) {
            const l_x4 = (l_x & 0x40000000);
            const l_y4 = (l_y & 0x40000000);
            const l_x8 = (l_x & 0x80000000);
            const l_y8 = (l_y & 0x80000000);
            const l_rslt = (l_x & 0x3FFFFFFF) + (l_y & 0x3FFFFFFF);

            if (l_x4 & l_y4) return (l_rslt ^ 0x80000000 ^ l_x8 ^ l_y8);

            if (l_x4 | l_y4) {
                return (l_rslt & 0x40000000)
                    ? (l_rslt ^ 0xC0000000 ^ l_x8 ^ l_y8)
                    : (l_rslt ^ 0x40000000 ^ l_x8 ^ l_y8);
            }

            return (l_rslt ^ l_x8 ^ l_y8);
        }

        const rotateLeft = (l_val, i_shift_bits) => (l_val << i_shift_bits) | (l_val >>> (32-i_shift_bits));

        const F = (x,y,z) => (x & y) | ((~x) & z);
        const G = (x,y,z) => (x & z) | (y & (~z));
        const H = (x,y,z) => (x ^ y ^ z);
        const I = (x,y,z) => (y ^ (x | (~z)));

        const OO = (a, s, b) => addUnsign(rotateLeft(a, s), b);

        const FF = (a,b,c,d,x,s,ac) => OO(addUnsign(a, addUnsign(addUnsign(F(b, c, d), x), ac)));
        const GG = (a,b,c,d,x,s,ac) => OO(addUnsign(a, addUnsign(addUnsign(G(b, c, d), x), ac)));
        const HH = (a,b,c,d,x,s,ac) => OO(addUnsign(a, addUnsign(addUnsign(H(b, c, d), x), ac)));
        const II = (a,b,c,d,x,s,ac) => OO(addUnsign(a, addUnsign(addUnsign(I(b, c, d), x), ac)));

        function convertToWordArray (str) {
            let w_count;
            let w_number = ((((str.length) + 8 - ((str.length) + 8  % 64))/64) + 1) * 16;
            let w_arr = Array(w_number - 1);

            let b_cursor = 0;
            let b_count = 0;

            const mod4 = (val) => val % 4;

            while ( b_count < str.length ) {
                w_count = (b_count - mod4(b_count)) / 4;
                b_cursor = mod4(b_count) * 8;
                w_arr[w_count] = (w_arr[w_count] | (str.charCodeAt(b_count) << b_cursor));
                b_count++;
            }

            w_count = (b_count-mod4(b_count)) / 4;
            b_cursor = mod4(b_count) * 8;
            w_arr[w_count] = w_arr[w_count] | (0x80 << b_cursor);
            w_arr[w_number - 2] = str.length << 3;
            w_arr[w_number - 1] = str.length >>> 29;

            return w_arr;
        }

        function wordToHex(val) {
            return [0, 1, 2, 3].reduce((acc, i) => {
                const byte = (val >>> (i * 8)) & 255;
                return acc + `0${byte.toString(16)}`.substr(`0${byte.toString(16)}`.length-2,2);
            }, '');
        }

        function utf8Encode(string) {
            const pure_string = string.replace(/\r\n/g,"\n");
            const ccode = (c) => String.fromCharCode(c);

            let utftext = "";

            for (var n = 0; n < pure_string.length; n++) {
                const c = pure_string.charCodeAt(n);

                if (c < 128) {
                    utftext += `${ccode(c)}`;
                } else if((c > 127) && (c < 2048)) {
                    utftext += `${ccode((c >> 6) | 192)}${ccode((c & 63) | 128)}`;
                } else {
                    utftext += `${ccode((c >> 12) | 224)}${ccode(((c >> 6) & 63) | 128)}${ccode((c & 63) | 128)}`;
                }
            }

            return utftext;
        }

        let x = convertToWordArray(utf8Encode(string));

        let a = 0x67452301;
        let b = 0xEFCDAB89;
        let c = 0x98BADCFE;
        let d = 0x10325476;

        for (let k = 0; k < x.length; k += 16) {
            let AA = a;
            let BB = b;
            let CC = c;
            let DD = d;

            a = FF(a, b, c, d, x[k + 0], 7, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], 12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], 17, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], 22,0xC1BDCEEE);

            a = FF(a, b, c, d, x[k + 4], 7, 0xF57C0FAF);
            d = FF(d, a, b, c, x[k + 5], 12, 0x4787C62A);
            c = FF(c, d, a, b, x[k + 6], 17, 0xA8304613);
            b = FF(b, c, d, a, x[k + 7], 22,0xFD469501);

            a = FF(a, b, c, d, x[k + 8], 7, 0x698098D8);
            d = FF(d, a, b, c, x[k + 9], 12, 0x8B44F7AF);
            c = FF(c, d, a, b, x[k + 10],17, 0xFFFF5BB1);
            b = FF(b, c, d, a, x[k + 11], 22,0x895CD7BE);

            a = FF(a, b, c, d, x[k + 12], 7, 0x6B901122);
            d = FF(d, a, b, c, x[k + 13], 12, 0xFD987193);
            c = FF(c, d, a, b, x[k + 14], 17, 0xA679438E);
            b = FF(b, c, d, a, x[k + 15], 22,0x49B40821);

            a = GG(a, b, c, d, x[k + 1], 5, 0xF61E2562);
            d = GG(d, a, b, c, x[k + 6], 9, 0xC040B340);
            c = GG(c, d, a, b, x[k + 11], 14, 0x265E5A51);
            b = GG(b, c, d, a, x[k + 0], 20, 0xE9B6C7AA);

            a = GG(a, b, c, d, x[k + 5], 5, 0xD62F105D);
            d = GG(d, a, b, c, x[k + 10], 9, 0x2441453);
            c = GG(c, d, a, b, x[k + 15], 14, 0xD8A1E681);
            b = GG(b, c, d, a, x[k + 4], 20, 0xE7D3FBC8);

            a = GG(a, b, c, d, x[k + 9], 5, 0x21E1CDE6);
            d = GG(d, a, b, c, x[k + 14], 9, 0xC33707D6);
            c = GG(c, d, a, b, x[k + 3], 14, 0xF4D50D87);
            b = GG(b, c, d, a, x[k + 8], 20, 0x455A14ED);

            a = GG(a, b, c, d, x[k + 13], 5, 0xA9E3E905);
            d = GG(d, a, b, c, x[k + 2], 9, 0xFCEFA3F8);
            c = GG(c, d, a, b, x[k + 7], 14, 0x676F02D9);
            b = GG(b, c, d, a, x[k + 12], 20, 0x8D2A4C8A);

            a = HH(a, b, c, d, x[k + 5], 4, 0xFFFA3942);
            d = HH(d, a, b, c, x[k + 8], 11, 0x8771F681);
            c = HH(c, d, a, b, x[k + 11], 16, 0x6D9D6122);
            b = HH(b, c, d, a, x[k + 14], 23,0xFDE5380C);

            a = HH(a, b, c, d, x[k + 1], 4, 0xA4BEEA44);
            d = HH(d, a, b, c, x[k + 4], 11, 0x4BDECFA9);
            c = HH(c, d, a, b, x[k + 7], 16, 0xF6BB4B60);
            b = HH(b, c, d, a, x[k + 10], 23,0xBEBFBC70);

            a = HH(a, b, c, d, x[k + 13], 4, 0x289B7EC6);
            d = HH(d, a, b, c, x[k + 0], 11, 0xEAA127FA);
            c = HH(c, d, a, b, x[k + 3], 16, 0xD4EF3085);
            b = HH(b, c, d, a, x[k + 6], 23,0x4881D05);

            a = HH(a, b, c, d, x[k + 9], 4, 0xD9D4D039);
            d = HH(d, a, b, c, x[k + 12], 11, 0xE6DB99E5);
            c = HH(c, d, a, b, x[k + 15], 16, 0x1FA27CF8);
            b = HH(b, c, d, a, x[k + 2], 23,0xC4AC5665);

            a = II(a, b, c, d, x[k + 0], 6, 0xF4292244);
            d = II(d, a, b, c, x[k + 7], 10, 0x432AFF97);
            c = II(c, d, a, b, x[k + 14], 15, 0xAB9423A7);
            b = II(b, c, d, a, x[k + 5], 21,0xFC93A039);

            a = II(a, b, c, d, x[k + 12], 6, 0x655B59C3);
            d = II(d, a, b, c, x[k + 3], 10, 0x8F0CCC92);
            c = II(c, d, a, b, x[k + 10], 15, 0xFFEFF47D);
            b = II(b, c, d, a, x[k + 1], 21,0x85845DD1);

            a = II(a, b, c, d, x[k + 8], 6, 0x6FA87E4F);
            d = II(d, a, b, c, x[k + 15], 10, 0xFE2CE6E0);
            c = II(c, d, a, b, x[k + 6], 15, 0xA3014314);
            b = II(b, c, d, a, x[k + 13], 21,0x4E0811A1);

            a = II(a, b, c, d, x[k + 4], 6, 0xF7537E82);
            d = II(d, a, b, c, x[k + 11], 10, 0xBD3AF235);
            c = II(c, d, a, b, x[k + 2], 15, 0x2AD7D2BB);
            b = II(b, c, d, a, x[k + 9], 21,0xEB86D391);

            a = addUnsign(a, AA);
            b = addUnsign(b, BB);
            c = addUnsign(c, CC);
            d = addUnsign(d, DD);
        }

        return `${wordToHex(a)}${wordToHex(b)}${wordToHex(c)}${wordToHex(d)}`.toLowerCase();
    }
