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
const userChecker_1 = require("../utils/userChecker");
const addHouse = (house) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        let houseToAdd = Object.assign({ id }, house);
        yield databaseHelper_1.default.addHouseToDb(houseToAdd);
        const usersToAdd = [];
        houseToAdd.users.forEach((item) => {
            if (usersToAdd.filter((user) => user.id === item.id).length === 0) {
                usersToAdd.push(item);
            }
        });
        usersToAdd.forEach((user) => {
            databaseHelper_1.default
                .addUserToHouse(user.id, houseToAdd.id)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((err) => {
                console.log(err);
                throw new Error(err.message);
            });
        });
        houseToAdd = Object.assign(Object.assign({}, houseToAdd), { users: usersToAdd });
        console.log('houseToadd:', houseToAdd);
        return houseToAdd;
    }
    catch (error) {
        throw new Error('db-error');
    }
});
const addUserToHouse = (adminUserId, userToAddId, houseForUserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const houseTheUserIsAddedTo = yield databaseHelper_1.default.getHouseById(houseForUserId);
        if (houseTheUserIsAddedTo.adminId !== adminUserId) {
            throw new Error('admin-error');
        }
        if (!(yield (0, userChecker_1.userExists)(userToAddId))) {
            throw new Error('no-userToAdd');
        }
        // TODO check if the user already belongs to the house
        yield databaseHelper_1.default.addUserToHouse(userToAddId, houseForUserId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const getAllHouseDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databaseHelper_1.default.getHouseById(id);
});
const deleteHouse = (houseId, adminId) => __awaiter(void 0, void 0, void 0, function* () {
    yield databaseHelper_1.default.removeHouseById(houseId, adminId);
});
const getUsersHouses = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield databaseHelper_1.default.getUserByIdWithHousesTheyHaveAccessTo(id);
});
exports.default = {
    addHouse,
    addUserToHouse,
    getAllHouseDataById,
    deleteHouse,
    getUsersHouses,
};
//# sourceMappingURL=houseService.js.map