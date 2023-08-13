"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typings_1 = require("../typings");
var getKeyChainValue_1 = require("./getKeyChainValue");
function matchDataKeyValue(data, _a) {
    var comparator = _a.comparator, key = _a.key, value = _a.value;
    var val = (0, getKeyChainValue_1.default)(key, data);
    switch (comparator) {
        case typings_1.Comparator.Equals:
            return val === value;
        case typings_1.Comparator.NotEqual:
            return val !== value;
        case typings_1.Comparator.In:
            return value.includes(val);
        case typings_1.Comparator.Between:
            return (Number(val) > Number(value) &&
                Number(val) > Number(value));
        case typings_1.Comparator.GreaterOrEqual:
            return Number(val) >= Number(value);
        case typings_1.Comparator.GreaterThan:
            return Number(val) > Number(value);
        case typings_1.Comparator.LessOrEqual:
            return Number(val) <= Number(value);
        case typings_1.Comparator.LessThan:
            return Number(val) < Number(value);
        case typings_1.Comparator.Matches:
            return typeof value === 'string'
                ? new RegExp(value).test("".concat(val))
                : value.test("".concat(val));
        default:
            return false;
    }
}
exports.default = matchDataKeyValue;
