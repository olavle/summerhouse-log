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
const houseData_1 = __importDefault(require("../database/dummydata/houseData"));
const uuid_1 = require("uuid");
const databaseHelper_1 = __importDefault(require("../database/databaseHelper"));
const addHouse = (house) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    const houseToAdd = Object.assign({ id: id.toString() }, house);
    yield databaseHelper_1.default.addHouseToDb(houseToAdd);
    houseData_1.default.push(houseToAdd);
    return houseToAdd;
});
exports.default = {
    addHouse,
};
//# sourceMappingURL=houseService.js.map