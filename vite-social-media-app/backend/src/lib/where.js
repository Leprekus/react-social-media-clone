"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typings_1 = require("../../typings");
function where(collector, runner) {
    return (key) => {
        const chain = {
            where: where(collector, runner)
        };
        return {
            matches(val) {
                collector(key, typings_1.Comparator.Matches, val);
                return chain;
            },
            equals(val) {
                collector(key, typings_1.Comparator.Matches, val);
                return chain;
            },
            notEqual(val) {
                collector(key, typings_1.Comparator.NotEqual, val);
                return chain;
            },
            in(val) {
                collector(key, typings_1.Comparator.In, val);
                return chain;
            },
            between(val) {
                collector(key, typings_1.Comparator.Between, val);
                return chain;
            },
            lessOrEqual(val) {
                collector(key, typings_1.Comparator.LessThan, val);
            },
            greaterThan(val) {
                collector(key, typings_1.Comparator.GreaterThan, val);
                return chain;
            },
            greaterOrEqual(val) {
                collector(key, typings_1.Comparator.GreaterOrEqual, val);
                return chain;
            }
        };
    };
}
exports.default = where;
