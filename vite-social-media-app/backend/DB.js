"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONDB = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var promises_1 = require("fs/promises");
var collect_1 = require("./lib/collect");
var matchDataKeyValue_1 = require("./lib/matchDataKeyValue");
var createItemsFromKeys_1 = require("./lib/createItemsFromKeys");
var mergeObjects_1 = require("./lib/mergeObjects");
var JSONDB = /** @class */ (function () {
    function JSONDB(filename) {
        this.filename = filename;
        this._size = 0;
        this.filePath = path_1.default.join(__dirname, "".concat(filename, ".json"));
        if (!fs_1.default.existsSync(this.filePath)) {
            fs_1.default.writeFileSync(this.filePath, '[]', 'utf-8');
        }
    }
    JSONDB.prototype.read = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, (0, promises_1.readFile)(this.filePath, 'utf-8')];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    JSONDB.prototype.save = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var content, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        content = data;
                        if (!!Array.isArray(data)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.read()];
                    case 1:
                        content = _a.sent();
                        content.push(data);
                        _a.label = 2;
                    case 2: return [2 /*return*/, (0, promises_1.writeFile)(this.filePath, JSON.stringify(content))];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw new Error('Failed to save data');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(JSONDB.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: false,
        configurable: true
    });
    JSONDB.prototype.insert = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.save(data)];
                    case 1:
                        _a.sent();
                        this._size += 1;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    JSONDB.prototype.getOne = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return (0, collect_1.default)(function (matchers) { return __awaiter(_this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.read()];
                    case 1:
                        item = (_a.sent()).find(function (item) {
                            return matchers.every(function (matcher) {
                                return (0, matchDataKeyValue_1.default)(item, matcher);
                            });
                        });
                        if (item) {
                            if (keys.length) {
                                return [2 /*return*/, (0, createItemsFromKeys_1.default)(keys, item)];
                            }
                            return [2 /*return*/, item];
                        }
                        return [2 /*return*/, null];
                }
            });
        }); });
    };
    JSONDB.prototype.getAll = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return (0, collect_1.default)(function (matchers) { return __awaiter(_this, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.read()];
                    case 1:
                        items = (_a.sent()).filter(function (item) {
                            return matchers.every(function (matcher) {
                                return (0, matchDataKeyValue_1.default)(item, matcher);
                            });
                        });
                        if (keys.length) {
                            return [2 /*return*/, items.map(function (item) {
                                    return (0, createItemsFromKeys_1.default)(keys, item);
                                })];
                        }
                        return [2 /*return*/, items];
                }
            });
        }); });
    };
    JSONDB.prototype.updateOne = function (data) {
        var _this = this;
        return (0, collect_1.default)(function (matchers) { return __awaiter(_this, void 0, void 0, function () {
            var list, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.read()];
                    case 1:
                        list = _a.sent();
                        item = list.find(function (item) {
                            return matchers.every(function (matcher) {
                                return (0, matchDataKeyValue_1.default)(item, matcher);
                            });
                        });
                        if (!item) return [3 /*break*/, 3];
                        (0, mergeObjects_1.default)(item, data);
                        return [4 /*yield*/, this.save(list)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, item];
                    case 3: return [2 /*return*/, null];
                }
            });
        }); });
    };
    JSONDB.prototype.updateAll = function (data) {
        var _this = this;
        return (0, collect_1.default)(function (matchers) { return __awaiter(_this, void 0, void 0, function () {
            var list, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.read()];
                    case 1:
                        list = _a.sent();
                        items = list.filter(function (item) {
                            return matchers.every(function (matcher) {
                                return (0, matchDataKeyValue_1.default)(item, matcher);
                            });
                        });
                        items.forEach(function (item) {
                            (0, mergeObjects_1.default)(item, data);
                        });
                        return [4 /*yield*/, this.save(list)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, items];
                }
            });
        }); });
    };
    JSONDB.prototype.deleteOne = function () {
        var _this = this;
        return (0, collect_1.default)(function (matchers) { return __awaiter(_this, void 0, void 0, function () {
            var list, existingItemIndex, existingItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.read()];
                    case 1:
                        list = _a.sent();
                        existingItemIndex = list.findIndex(function (item) {
                            return matchers.every(function (matcher) {
                                return (0, matchDataKeyValue_1.default)(item, matcher);
                            });
                        });
                        if (!(existingItemIndex >= 0)) return [3 /*break*/, 3];
                        existingItem = list.splice(existingItemIndex, 1)[0];
                        return [4 /*yield*/, this.save(list)];
                    case 2:
                        _a.sent();
                        this._size -= 1;
                        return [2 /*return*/, existingItem];
                    case 3: return [2 /*return*/, null];
                }
            });
        }); });
    };
    JSONDB.prototype.deleteAll = function () {
        var _this = this;
        return (0, collect_1.default)(function (matchers) { return __awaiter(_this, void 0, void 0, function () {
            var existingItems, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        existingItems = [];
                        return [4 /*yield*/, this.read()];
                    case 1:
                        list = (_a.sent()).filter(function (item) {
                            if (matchers.every(function (matcher) {
                                return (0, matchDataKeyValue_1.default)(item, matcher);
                            })) {
                                existingItems.push(item);
                                return false;
                            }
                            return true;
                        });
                        if (!existingItems.length) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.save(list)];
                    case 2:
                        _a.sent();
                        this._size = list.length;
                        return [2 /*return*/, existingItems];
                    case 3: return [2 /*return*/, null];
                }
            });
        }); });
    };
    JSONDB.prototype.drop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, promises_1.unlink)(this.filePath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return JSONDB;
}());
exports.JSONDB = JSONDB;
