"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getKeyChainValue(keyChain, data) {
    var parts = String(keyChain).split('.');
    var key = parts.shift();
    var value = data[key];
    if (parts.length) {
        if (value && typeof value === 'object') {
            return getKeyChainValue(parts.join('.'), value);
        }
        throw new Error("Cannot get ".concat(parts.join('.'), " of ").concat(value));
    }
    return value;
}
exports.default = getKeyChainValue;
