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
const getMessagesForHouseId = (houseId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databaseHelper_1.default.getMessagesForHouseIdFromDb(houseId);
});
const addNewMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const messageToAdd = Object.assign(Object.assign({}, message), { id: (0, uuid_1.v4)() });
    yield databaseHelper_1.default.addNewMessageToDb(messageToAdd);
    return messageToAdd;
});
exports.default = {
    getMessagesForHouseId,
    addNewMessage,
};
//# sourceMappingURL=messageService.js.map