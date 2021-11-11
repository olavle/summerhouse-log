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
const uuid_1 = require("uuid");
const databaseHelper_1 = __importDefault(require("../database/databaseHelper"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    const passHash = yield bcrypt_1.default.hash(user.password, saltRounds);
    const userToAdd = Object.assign(Object.assign({ id }, user), { password: passHash });
    yield databaseHelper_1.default.addUserToDb(userToAdd);
    return userToAdd;
});
const editUserBasicInfo = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield databaseHelper_1.default.getUserById(id);
    yield databaseHelper_1.default.editUserBasicInfo(user.id, data);
    const editedUser = Object.assign(Object.assign({}, user), data);
    return editedUser;
});
const getUserWithHouses = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield databaseHelper_1.default.getUserByIdWithHousesTheyHaveAccessTo(id);
});
// const changeUserPassword = async (id: string, newPass: string): Promise<void> => {
//   const user = await databaseHelper.getUserById(id);
//   console.log('The user is:', user);
//   console.log('The new password is', newPass);
//   const hashedPass = await bcrypt.hash(newPass, saltRounds);
// };
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield databaseHelper_1.default.getAllUsers();
});
// TODO: make this correlate with db relations
const linkHouseToUser = (user, houseId) => {
    var _a;
    (_a = user.linkedHouses) === null || _a === void 0 ? void 0 : _a.push({
        id: houseId,
    });
    return user;
};
exports.default = {
    addUser,
    getAllUsers,
    linkHouseToUser,
    editUserBasicInfo,
    getUserWithHouses,
};
//# sourceMappingURL=userService.js.map