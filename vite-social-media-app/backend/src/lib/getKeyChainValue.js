"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getKeyChainValue(keyChain, data) {
    const parts = String(keyChain).split('.');
    const key = parts.shift();
    const value = data[key];
    if (parts.length) {
        if (value && typeof value === 'object') {
            return getKeyChainValue(parts.join('.'), value);
        }
        throw new Error(`Cannot get ${parts.join('.')} of ${value}`);
    }
    return value;
}
exports.default = getKeyChainValue;
