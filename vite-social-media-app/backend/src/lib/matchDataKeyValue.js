"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typings_1 = require("../../typings");
const getKeyChainValue_1 = __importDefault(require("./getKeyChainValue"));
function matchDataKeyValue(data, { comparator, key, value }) {
    const val = (0, getKeyChainValue_1.default)(key, data);
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
                ? new RegExp(value).test(`${val}`)
                : value.test(`${val}`);
        default:
            return false;
    }
}
exports.default = matchDataKeyValue;
