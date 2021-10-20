"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNewHouse = exports.parseUserFromDb = exports.parseLogin = exports.parseNewUser = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const isString = (param) => {
    console.log('Strgin parser here: the type of this param is:', typeof param);
    return typeof param === 'string';
};
const isNumber = (param) => {
    return typeof param === 'number';
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isBoolean = (param) => {
    return typeof param === 'boolean';
};
const isRole = (param) => {
    return param === 'User' || param === 'Admin';
};
const parseString = (text) => {
    if (!text || !isString(text)) {
        throw new Error(`String parser: Content is missing or in wrong format: ${text}, the type is: ${typeof text}`);
    }
    return text;
};
const parseOptionalString = (text) => {
    if (!text) {
        return undefined;
    }
    if (!isString(text)) {
        throw new Error(`optional string parser: Content is missing or in wrong format: ${text}`);
    }
    return text;
};
const parseOptionalBoolean = (value) => {
    if (!value) {
        return undefined;
    }
    if (!isBoolean(value)) {
        throw new Error(`Optional boolean parser: Content is missing or in wrong format: ${value}`);
    }
    return value;
};
// const parseBoolean = (value: unknown): boolean => {
//   if (!value || !isBoolean(value)) {
//     throw new Error(`Content is missing or in wrong format: ${value}`);
//   }
//   return value;
// };
// const parseNumber = (number: unknown): number => {
//   if (!number || !isNumber(number)) {
//     throw new Error(`Content is missing or in wrong format: ${number}`);
//   }
//   return number;
// };
const parseOptionalNumber = (number) => {
    if (!number) {
        return undefined;
    }
    if (!isNumber(number)) {
        throw new Error(`Optional number parser: Content is missing or in wrong format: ${number}`);
    }
    return number;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Date parser: Content is missing or in wrong format: ${date}`);
    }
    return date;
};
const parseRoleForNewUser = (role) => {
    if (!role) {
        return undefined;
    }
    if (!isRole(role)) {
        throw new Error(`New user role parser: Content is missing or in wrong format: ${role}`);
    }
    return role;
};
const parseRoleForDbUser = (role) => {
    if (!isRole(role)) {
        throw new Error(`db user role parsers: Content is missing or in wrong format: ${role}`);
    }
    return role;
};
const parseUserIdList = (list) => {
    if (!list || !Array.isArray(list)) {
        throw new Error(`user id list parser: Content is missing or in wrong format`);
    }
    const finalList = list.map(item => {
        return {
            id: parseString(item.id)
        };
    });
    return finalList;
};
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseNewUser = (obj) => {
    const newUser = {
        fname: parseString(obj.fname),
        lname: parseString(obj.lname),
        username: parseString(obj.username),
        password: parseString(obj.password),
        email: parseOptionalString(obj.email),
        role: parseRoleForNewUser(obj.role) || 'User',
    };
    return newUser;
};
exports.parseNewUser = parseNewUser;
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseLogin = (obj) => {
    console.log('username:', obj.username);
    console.log('password:', obj.password);
    const loginCredentials = {
        username: parseString(obj.username),
        password: parseString(obj.password),
        keepLoggedIn: parseOptionalBoolean(obj.keepLoggedIn) || false,
    };
    console.log('The whole loginCred object:', loginCredentials);
    return loginCredentials;
};
exports.parseLogin = parseLogin;
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseUserFromDb = (obj) => {
    const user = {
        id: parseString(obj.app_user_id),
        fname: parseString(obj.first_name),
        lname: parseString(obj.last_name),
        username: parseString(obj.username),
        password: parseString(obj.passwordhash),
        email: parseString(obj.email),
        role: parseRoleForDbUser(obj.role),
    };
    return user;
};
exports.parseUserFromDb = parseUserFromDb;
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseNewHouse = (obj) => {
    const newHouse = {
        adminId: parseString(obj.adminId),
        name: parseString(obj.name),
        address: parseOptionalString(obj.address),
        maxResidents: parseOptionalNumber(obj.maxResidents),
        users: parseUserIdList(obj.users),
        timestamp: parseDate((0, dayjs_1.default)(new Date())),
        imageUrl: parseOptionalString(obj.imageUrl)
    };
    return newHouse;
};
exports.parseNewHouse = parseNewHouse;
//# sourceMappingURL=dataParsers.js.map