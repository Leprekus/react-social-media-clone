"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
function mergeObjects(a, b) {
    if (a === null || typeof a !== 'object')
        return b;
    if (b === null || typeof b !== 'object')
        return b;
    var obj = Array.isArray(a) ? __spreadArray([], a, true) : a;
    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            obj[key] = mergeObjects(obj[key], b[key]);
        }
    }
    return obj;
}
exports.default = mergeObjects;
