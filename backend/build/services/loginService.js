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
const bcrypt_1 = __importDefault(require("bcrypt"));
const databaseHelper_1 = __importDefault(require("../database/databaseHelper"));
const jwtHelper_1 = __importDefault(require("../utils/jwtHelper"));
const passWordIsCorrect = (user, passwordFromInput) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordFromDb = user.password;
    return yield bcrypt_1.default.compare(passwordFromInput, passwordFromDb);
});
const checkPassAndLogin = (userFromInput) => __awaiter(void 0, void 0, void 0, function* () {
    const userFromDb = yield databaseHelper_1.default.getUserByUsername(userFromInput.username);
    if (!(yield passWordIsCorrect(userFromDb, userFromInput.password))) {
        throw new Error('no-password');
    }
    const userForJwt = {
        id: userFromDb.id,
        fname: userFromDb.fname,
        lname: userFromDb.lname,
        username: userFromDb.username,
        email: userFromDb.email,
        role: userFromDb.role,
    };
    return jwtHelper_1.default.encodeUser(userForJwt);
});
exports.default = {
    passWordIsCorrect,
    checkPassAndLogin,
};
//# sourceMappingURL=loginService.js.map