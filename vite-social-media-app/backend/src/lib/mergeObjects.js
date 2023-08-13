"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mergeObjects(a, b) {
    if (a === null || typeof a !== 'object')
        return b;
    if (b === null || typeof b !== 'object')
        return b;
    const obj = Array.isArray(a) ? [...a] : a;
    for (const key in b) {
        if (b.hasOwnProperty(key)) {
            obj[key] = mergeObjects(obj[key], b[key]);
        }
    }
    return obj;
}
exports.default = mergeObjects;
