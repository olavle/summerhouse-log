"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseReplyFromDb = exports.parseNewReply = exports.parseNewMessage = exports.parseMessageFromDb = exports.parseNewShortage = exports.parseShortageFromDb = exports.parseReservationFromDb = exports.parseNewReservation = exports.parseNewHouse = exports.parseHouseFromDb = exports.parseUserPasswordToEdit = exports.parseUserToEdit = exports.parseUserFromDb = exports.parseLogin = exports.parseNewUser = exports.parseString = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
// import timezone from 'dayjs/plugin/timezone';
// dayjs.extend(timezone);
//var timezone = require('dayjs/plugin/timezone')
const isString = (param) => {
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
        console.log('Error in parseString');
        throw new Error(`parse-fail`);
    }
    return text;
};
exports.parseString = parseString;
const parseOptionalString = (text) => {
    if (!text) {
        return undefined;
    }
    if (!isString(text)) {
        console.log('Error in parseOptionalString');
        throw new Error(`parse-fail`);
    }
    return text;
};
const parseOptionalBoolean = (value) => {
    if (value === undefined) {
        return undefined;
    }
    if (!isBoolean(value)) {
        console.log('Error in parseOptionalBoolean');
        throw new Error(`parse-fail`);
    }
    return value;
};
const parseBoolean = (value) => {
    if (value === undefined || !isBoolean(value)) {
        throw new Error(`Content is missing or in wrong format: ${value}`);
    }
    return value;
};
const parseNumber = (number) => {
    if (!number || !isNumber(number)) {
        throw new Error(`Content is missing or in wrong format: ${number}`);
    }
    return number;
};
// const parseOptionalNumber = (number: unknown): number | undefined => {
//   if (!number) {
//     return undefined;
//   }
//   if (!isNumber(number)) {
//     console.log('Error in parseOptionalNumber');
//     throw new Error(`parse-fail`);
//   }
//   return number;
// };
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        console.log('Error in parseDate');
        throw new Error(`parse-fail`);
    }
    return date;
};
const parseRoleForNewUser = (role) => {
    if (!role) {
        return undefined;
    }
    if (!isRole(role)) {
        console.log('Error in parseRoleForNewUser');
        throw new Error(`parse-fail`);
    }
    return role;
};
const parseRoleForDbUser = (role) => {
    if (!isRole(role)) {
        console.log('Error in parseRoleForDbUser');
        throw new Error(`parse-fail`);
    }
    return role;
};
// const parseUserForHouseIdList = (list: unknown): UserForHouse[] => {
//   if (!list || !Array.isArray(list)) {
//     console.log('Error in parseUserForHouseIdList');
//     throw new Error(`parse-fail`);
//   }
//   const finalList = list.map((item) => {
//     // check if item is type of HouseForUser
//     return {
//       id: parseString(item.id),
//     };
//   });
//   return finalList;
// };
const parseOptionalUserForHouseIdList = (list) => {
    if (!list) {
        return undefined;
    }
    if (!Array.isArray(list)) {
        throw new Error(`parse-fail`);
    }
    const finalList = list.map((item) => {
        // check if item is type of HouseForUser
        return {
            id: (0, exports.parseString)(item.id),
        };
    });
    return finalList;
};
// const parseHouseForUserIdList = (list: unknown): HouseForUser[] => {
//   if (!list || !Array.isArray(list)) {
//     throw new Error(`parse-fail`);
//   }
//   const finalList = list.map((item) => {
//     // check if item is type of HouseForUser
//     return {
//       id: parseString(item.id),
//     };
//   });
//   return finalList;
// };
// const parseOptionalHouseForUserIdList = (
//   list: unknown
// ): HouseForUser[] | undefined => {
//   if (!list) {
//     return undefined;
//   }
//   if (!Array.isArray(list)) {
//     throw new Error(`parse-fail`);
//   }
//   const finalList = list.map((item) => {
//     // check if item is type of HouseForUser
//     return {
//       id: parseString(item.id),
//     };
//   });
//   return finalList;
// };
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseNewUser = (obj) => {
    console.log('Hello from parseNewUser');
    const newUser = {
        fname: (0, exports.parseString)(obj.fname),
        lname: (0, exports.parseString)(obj.lname),
        username: (0, exports.parseString)(obj.username),
        password: (0, exports.parseString)(obj.password),
        email: parseOptionalString(obj.email),
        role: parseRoleForNewUser(obj.role) || 'User',
    };
    return newUser;
};
exports.parseNewUser = parseNewUser;
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseLogin = (obj) => {
    console.log('Hello from parseLogin');
    const loginCredentials = {
        username: (0, exports.parseString)(obj.username),
        password: (0, exports.parseString)(obj.password),
        keepLoggedIn: parseOptionalBoolean(obj.keepLoggedIn) || false,
    };
    return loginCredentials;
};
exports.parseLogin = parseLogin;
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseUserFromDb = (obj) => {
    console.log('Hello from parseUserFromDb');
    const user = {
        id: (0, exports.parseString)(obj.app_user_id),
        fname: (0, exports.parseString)(obj.first_name),
        lname: (0, exports.parseString)(obj.last_name),
        username: (0, exports.parseString)(obj.username),
        password: (0, exports.parseString)(obj.passwordhash),
        email: parseOptionalString(obj.email),
        role: parseRoleForDbUser(obj.role),
    };
    return user;
};
exports.parseUserFromDb = parseUserFromDb;
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseUserToEdit = (obj, originalUser) => {
    console.log('Hello from parseUserToEdit');
    const editable = {
        fname: parseOptionalString(obj.fname) || (0, exports.parseString)(originalUser.fname),
        lname: parseOptionalString(obj.lname) || (0, exports.parseString)(originalUser.lname),
        email: parseOptionalString(obj.email) || (0, exports.parseString)(originalUser.email),
    };
    return editable;
};
exports.parseUserToEdit = parseUserToEdit;
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseUserPasswordToEdit = (obj) => {
    console.log('Hello from parseUserPasswordToEdit');
    const editable = {
        password: (0, exports.parseString)(obj.password),
    };
    return editable;
};
exports.parseUserPasswordToEdit = parseUserPasswordToEdit;
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseHouseFromDb = (obj, users) => {
    console.log('Hello from parseHouseFromDb');
    const house = {
        id: (0, exports.parseString)(obj.house_id),
        adminId: (0, exports.parseString)(obj.admin_id),
        name: (0, exports.parseString)(obj.name),
        address: parseOptionalString(obj.address),
        maxResidents: parseNumber(obj.max_residents),
        users: parseOptionalUserForHouseIdList(users) || [],
        timestamp: parseDate(obj.creation_date),
        imageUrl: parseOptionalString(obj.image_url),
    };
    return house;
};
exports.parseHouseFromDb = parseHouseFromDb;
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseNewHouse = (obj) => {
    console.log('Hello from parseNewHouse');
    const newHouse = {
        adminId: (0, exports.parseString)(obj.adminId),
        name: (0, exports.parseString)(obj.name),
        address: parseOptionalString(obj.address),
        maxResidents: parseNumber(obj.maxResidents),
        users: parseOptionalUserForHouseIdList(obj.users) || [],
        timestamp: parseDate((0, dayjs_1.default)().locale('fi').format()),
        imageUrl: parseOptionalString(obj.imageUrl),
    };
    return newHouse;
};
exports.parseNewHouse = parseNewHouse;
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseNewReservation = (obj) => {
    console.log('Hello from parseNewReservation');
    const newReservation = {
        userWhoAddedId: (0, exports.parseString)(obj.userWhoAddedId),
        houseId: (0, exports.parseString)(obj.houseId),
        participantAmount: parseNumber(obj.participantAmount),
        startingDate: parseDate(obj.startingDate),
        endingDate: parseDate(obj.endingDate),
        comment: parseOptionalString(obj.comment),
        isDecided: parseBoolean(obj.isDecided),
    };
    return newReservation;
};
exports.parseNewReservation = parseNewReservation;
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseReservationFromDb = (obj) => {
    console.log('Hello from parseNewReservation');
    const reservation = {
        id: (0, exports.parseString)(obj.reservation_id),
        userWhoAddedId: (0, exports.parseString)(obj.reservator_id),
        houseId: (0, exports.parseString)(obj.house_id),
        participantAmount: parseNumber(obj.participant_amount),
        startingDate: parseDate(obj.start_time),
        endingDate: parseDate(obj.end_time),
        comment: parseOptionalString(obj.comment),
        isDecided: parseBoolean(obj.is_final),
    };
    return reservation;
};
exports.parseReservationFromDb = parseReservationFromDb;
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseShortageFromDb = (obj) => {
    console.log('Hello from parseShortageFromDb');
    const shortage = {
        id: (0, exports.parseString)(obj.shortage_id),
        userWhoAddedId: (0, exports.parseString)(obj.author_id),
        houseId: (0, exports.parseString)(obj.house_id),
        content: (0, exports.parseString)(obj.content),
        isResolved: parseBoolean(obj.resolved),
        timestamp: parseDate(obj.timestamp)
    };
    return shortage;
};
exports.parseShortageFromDb = parseShortageFromDb;
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseNewShortage = (obj) => {
    console.log('Hello from parseNewShortage');
    const shortage = {
        userWhoAddedId: (0, exports.parseString)(obj.userWhoAddedId),
        houseId: (0, exports.parseString)(obj.houseId),
        content: (0, exports.parseString)(obj.content),
        isResolved: parseBoolean(false),
        timestamp: parseDate((0, dayjs_1.default)().locale('fi').format())
    };
    return shortage;
};
exports.parseNewShortage = parseNewShortage;
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseMessageFromDb = (obj) => {
    console.log('Hello from parseMessageFromDb');
    const message = {
        id: (0, exports.parseString)(obj.message_id),
        userWhoAddedId: (0, exports.parseString)(obj.author_id),
        houseId: (0, exports.parseString)(obj.house_id),
        content: (0, exports.parseString)(obj.content),
        timestamp: parseDate(obj.timestamp),
    };
    return message;
};
exports.parseMessageFromDb = parseMessageFromDb;
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseNewMessage = (obj) => {
    console.log('Hello from parseNewMessage');
    const message = {
        userWhoAddedId: (0, exports.parseString)(obj.userWhoAddedId),
        houseId: (0, exports.parseString)(obj.houseId),
        content: (0, exports.parseString)(obj.content),
        timestamp: parseDate((0, dayjs_1.default)().locale('fi').format()),
    };
    return message;
};
exports.parseNewMessage = parseNewMessage;
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseNewReply = (obj) => {
    console.log('Hello from parseNewNewReply');
    const reply = {
        userWhoAddedId: (0, exports.parseString)(obj.userWhoAddedId),
        originalMessageId: (0, exports.parseString)(obj.originalMessageId),
        content: (0, exports.parseString)(obj.content),
        timestamp: parseDate((0, dayjs_1.default)().locale('fi').format()),
    };
    return reply;
};
exports.parseNewReply = parseNewReply;
// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseReplyFromDb = (obj) => {
    console.log('Hello from parseNewNewReply');
    const reply = {
        id: (0, exports.parseString)(obj.message_reply_id),
        userWhoAddedId: (0, exports.parseString)(obj.author_id),
        originalMessageId: (0, exports.parseString)(obj.reply_to_id),
        content: (0, exports.parseString)(obj.content),
        timestamp: parseDate(obj.timestamp),
    };
    return reply;
};
exports.parseReplyFromDb = parseReplyFromDb;
//# sourceMappingURL=dataParsers.js.map