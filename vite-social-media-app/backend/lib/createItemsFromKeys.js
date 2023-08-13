"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createItemFromKeys(keys, data) {
    var partialItem = {};
    //loops over key chains
    //until there are no more keys / children left
    keys.forEach(function (keyChain) {
        var target = partialItem;
        var source = data;
        String(keyChain)
            .split('.')
            .forEach(function (key, index, parts) {
            var _a;
            var value = source[key];
            if (value === undefined)
                throw new Error("Key ".concat(key, " does not exist in ").concat(JSON.stringify(source)));
            var isLastKey = index == parts.length - 1;
            target[key] =
                //if last key returns value
                //else returns array if array else object
                (_a = target[key]) !== null && _a !== void 0 ? _a : (!isLastKey ? (Array.isArray(value) ? [] : {}) : value);
            target = target[key];
            source = value;
        });
    });
    return partialItem;
}
exports.default = createItemFromKeys;
