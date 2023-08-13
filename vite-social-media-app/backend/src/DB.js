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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONDB = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const promises_1 = require("fs/promises");
const collect_1 = __importDefault(require("./lib/collect"));
const matchDataKeyValue_1 = __importDefault(require("./lib/matchDataKeyValue"));
const createItemsFromKeys_1 = __importDefault(require("./lib/createItemsFromKeys"));
const mergeObjects_1 = __importDefault(require("./lib/mergeObjects"));
class JSONDB {
    constructor(filename) {
        this.filename = filename;
        this._size = 0;
        this.filePath = path_1.default.join(__dirname, `${filename}.json`);
        if (!fs_1.default.existsSync(this.filePath)) {
            fs_1.default.writeFileSync(this.filePath, '[]', 'utf-8');
        }
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            return JSON.parse(yield (0, promises_1.readFile)(this.filePath, 'utf-8'));
        });
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let content = data;
                if (!Array.isArray(data)) {
                    content = yield this.read();
                    content.push(data);
                }
                return (0, promises_1.writeFile)(this.filePath, JSON.stringify(content));
            }
            catch (error) {
                console.log(error);
                throw new Error('Failed to save data');
            }
        });
    }
    get size() {
        return this._size;
    }
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.save(data);
            this._size += 1;
            return data;
        });
    }
    getOne(...keys) {
        return (0, collect_1.default)((matchers) => __awaiter(this, void 0, void 0, function* () {
            const item = (yield this.read()).find((item) => {
                return matchers.every((matcher) => (0, matchDataKeyValue_1.default)(item, matcher));
            });
            if (item) {
                if (keys.length) {
                    return (0, createItemsFromKeys_1.default)(keys, item);
                }
                return item;
            }
            return null;
        }));
    }
    getAll(...keys) {
        return (0, collect_1.default)((matchers) => __awaiter(this, void 0, void 0, function* () {
            const items = (yield this.read()).filter((item) => {
                return matchers.every((matcher) => (0, matchDataKeyValue_1.default)(item, matcher));
            });
            if (keys.length) {
                return items.map((item) => {
                    return (0, createItemsFromKeys_1.default)(keys, item);
                });
            }
            return items;
        }));
    }
    updateOne(data) {
        return (0, collect_1.default)((matchers) => __awaiter(this, void 0, void 0, function* () {
            const list = yield this.read();
            const item = list.find((item) => {
                return matchers.every((matcher) => (0, matchDataKeyValue_1.default)(item, matcher));
            });
            if (item) {
                (0, mergeObjects_1.default)(item, data);
                yield this.save(list);
                return item;
            }
            return null;
        }));
    }
    updateAll(data) {
        return (0, collect_1.default)((matchers) => __awaiter(this, void 0, void 0, function* () {
            const list = yield this.read();
            const items = list.filter((item) => {
                return matchers.every((matcher) => (0, matchDataKeyValue_1.default)(item, matcher));
            });
            items.forEach((item) => {
                (0, mergeObjects_1.default)(item, data);
            });
            yield this.save(list);
            return items;
        }));
    }
    deleteOne() {
        return (0, collect_1.default)((matchers) => __awaiter(this, void 0, void 0, function* () {
            const list = yield this.read();
            const existingItemIndex = list.findIndex((item) => {
                return matchers.every((matcher) => (0, matchDataKeyValue_1.default)(item, matcher));
            });
            if (existingItemIndex >= 0) {
                const [existingItem] = list.splice(existingItemIndex, 1);
                yield this.save(list);
                this._size -= 1;
                return existingItem;
            }
            return null;
        }));
    }
    deleteAll() {
        return (0, collect_1.default)((matchers) => __awaiter(this, void 0, void 0, function* () {
            const existingItems = [];
            const list = (yield this.read()).filter((item) => {
                if (matchers.every((matcher) => (0, matchDataKeyValue_1.default)(item, matcher))) {
                    existingItems.push(item);
                    return false;
                }
                return true;
            });
            if (existingItems.length) {
                yield this.save(list);
                this._size = list.length;
                return existingItems;
            }
            return null;
        }));
    }
    drop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, promises_1.unlink)(this.filePath);
        });
    }
}
exports.JSONDB = JSONDB;
