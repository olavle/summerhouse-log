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
const databaseHelper_1 = __importDefault(require("../database/databaseHelper"));
const uuid_1 = require("uuid");
const getHouseSpecificShortages = (houseId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databaseHelper_1.default.getShortagesWithHouseId(houseId);
});
const addNewShortage = (shortage) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    const shortageToAdd = Object.assign(Object.assign({}, shortage), { id });
    yield databaseHelper_1.default.addNewShortageToDb(shortageToAdd);
    return shortageToAdd;
});
const resolveShortage = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    yield databaseHelper_1.default.resolveShortage(obj);
});
exports.default = {
    getHouseSpecificShortages,
    addNewShortage,
    resolveShortage
};
//# sourceMappingURL=shortageService.js.map