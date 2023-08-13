"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typings_1 = require("../typings");
function where(collector, runner) {
    return function (key) {
        var chain = {
            where: where(collector, runner)
        };
        return {
            matches: function (val) {
                collector(key, typings_1.Comparator.Matches, val);
                return chain;
            },
            equals: function (val) {
                collector(key, typings_1.Comparator.Matches, val);
                return chain;
            },
            notEqual: function (val) {
                collector(key, typings_1.Comparator.NotEqual, val);
                return chain;
            },
            in: function (val) {
                collector(key, typings_1.Comparator.In, val);
                return chain;
            },
            between: function (val) {
                collector(key, typings_1.Comparator.Between, val);
                return chain;
            },
            lessOrEqual: function (val) {
                collector(key, typings_1.Comparator.LessThan, val);
            },
            greaterThan: function (val) {
                collector(key, typings_1.Comparator.GreaterThan, val);
                return chain;
            },
            greaterOrEqual: function (val) {
                collector(key, typings_1.Comparator.GreaterOrEqual, val);
                return chain;
            }
        };
    };
}
exports.default = where;
