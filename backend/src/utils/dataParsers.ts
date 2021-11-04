import {
  EditableUserBasicInfo,
  EditableUserPassword,
  House,
  LoginUser,
  NewHouse,
  NewReservation,
  NewShortage,
  NewUser,
  Reservation,
  Shortage,
  User,
  UserForHouse,
  UserForJwt,
  UserRole,
} from '../types';
import dayjs from 'dayjs';
// import timezone from 'dayjs/plugin/timezone';
// dayjs.extend(timezone);

//var timezone = require('dayjs/plugin/timezone')

const isString = (param: unknown): param is string => {
  return typeof param === 'string';
};

const isNumber = (param: unknown): param is number => {
  return typeof param === 'number';
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isBoolean = (param: unknown): param is boolean => {
  return typeof param === 'boolean';
};

const isRole = (param: unknown): param is UserRole => {
  return param === 'User' || param === 'Admin';
};

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    console.log('Error in parseString');
    throw new Error(`parse-fail`);
  }
  return text;
};

const parseOptionalString = (text: unknown): string | undefined => {
  if (!text) {
    return undefined;
  }
  if (!isString(text)) {
    console.log('Error in parseOptionalString');
    throw new Error(`parse-fail`);
  }
  return text;
};

const parseOptionalBoolean = (value: unknown): boolean | undefined => {
  if (value === undefined) {
    return undefined;
  }
  if (!isBoolean(value)) {
    console.log('Error in parseOptionalBoolean');
    throw new Error(`parse-fail`);
  }
  return value;
};

const parseBoolean = (value: unknown): boolean => {
  if (value === undefined || !isBoolean(value)) {
    throw new Error(`Content is missing or in wrong format: ${value}`);
  }
  return value;
};

const parseNumber = (number: unknown): number => {
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

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    console.log('Error in parseDate');
    throw new Error(`parse-fail`);
  }
  return date;
};

const parseRoleForNewUser = (role: unknown): UserRole | undefined => {
  if (!role) {
    return undefined;
  }
  if (!isRole(role)) {
    console.log('Error in parseRoleForNewUser');
    throw new Error(`parse-fail`);
  }
  return role;
};

const parseRoleForDbUser = (role: unknown): UserRole => {
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

const parseOptionalUserForHouseIdList = (
  list: unknown
): UserForHouse[] | undefined => {
  if (!list) {
    return undefined;
  }
  if (!Array.isArray(list)) {
    throw new Error(`parse-fail`);
  }
  const finalList = list.map((item) => {
    // check if item is type of HouseForUser
    return {
      id: parseString(item.id),
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
export const parseNewUser = (obj: any): NewUser => {
  console.log('Hello from parseNewUser');
  const newUser: NewUser = {
    fname: parseString(obj.fname),
    lname: parseString(obj.lname),
    username: parseString(obj.username),
    password: parseString(obj.password),
    email: parseOptionalString(obj.email),
    role: parseRoleForNewUser(obj.role) || 'User',
  };

  return newUser;
};

// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseLogin = (obj: any): LoginUser => {
  console.log('Hello from parseLogin');
  const loginCredentials: LoginUser = {
    username: parseString(obj.username),
    password: parseString(obj.password),
    keepLoggedIn: parseOptionalBoolean(obj.keepLoggedIn) || false,
  };
  return loginCredentials;
};

// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseUserFromDb = (obj: any): User => {
  console.log('Hello from parseUserFromDb');
  const user: User = {
    id: parseString(obj.app_user_id),
    fname: parseString(obj.first_name),
    lname: parseString(obj.last_name),
    username: parseString(obj.username),
    password: parseString(obj.passwordhash),
    email: parseOptionalString(obj.email),
    role: parseRoleForDbUser(obj.role),
  };
  return user;
};

// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseUserToEdit = (obj: any, originalUser: UserForJwt): EditableUserBasicInfo => {
  console.log('Hello from parseUserToEdit');
  const editable: EditableUserBasicInfo = {
    fname: parseOptionalString(obj.fname) || parseString(originalUser.fname),
    lname: parseOptionalString(obj.lname) || parseString(originalUser.lname),
    email: parseOptionalString(obj.email) || parseString(originalUser.email),
  };
  return editable;
};

// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseUserPasswordToEdit = (obj: any): EditableUserPassword => {
  console.log('Hello from parseUserPasswordToEdit');
  const editable: EditableUserPassword = {
    password: parseString(obj.password),
  };
  return editable;
};

// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseHouseFromDb = (obj: any, users?: UserForHouse[]): House => {
  console.log('Hello from parseHouseFromDb');
  const house: House = {
    id: parseString(obj.house_id),
    adminId: parseString(obj.admin_id),
    name: parseString(obj.name),
    address: parseOptionalString(obj.address),
    maxResidents: parseNumber(obj.max_residents),
    users: parseOptionalUserForHouseIdList(users) || [],
    timestamp: parseDate(obj.creation_date),
    imageUrl: parseOptionalString(obj.image_url),
  };
  return house;
};

// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseNewHouse = (obj: any): NewHouse => {
  console.log('Hello from parseNewHouse');
  const newHouse: NewHouse = {
    adminId: parseString(obj.adminId),
    name: parseString(obj.name),
    address: parseOptionalString(obj.address),
    maxResidents: parseNumber(obj.maxResidents),
    users: parseOptionalUserForHouseIdList(obj.users) || [],
    timestamp: parseDate(dayjs().locale('fi').format()),
    imageUrl: parseOptionalString(obj.imageUrl),
  };

  return newHouse;
};

// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseNewReservation = (obj: any): NewReservation => {
  console.log('Hello from parseNewReservation');
  const newReservation: NewReservation = {
    userWhoAddedId: parseString(obj.userWhoAddedId),
    houseId: parseString(obj.houseId),
    participantAmount: parseNumber(obj.participantAmount),
    startingDate: parseDate(obj.startingDate),
    endingDate: parseDate(obj.endingDate),
    comment: parseOptionalString(obj.comment),
    isDecided: parseBoolean(obj.isDecided),
  };
  return newReservation;
};

// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseReservationFromDb = (obj: any): Reservation => {
  console.log('Hello from parseNewReservation');
  const reservation: Reservation = {
    id: parseString(obj.reservation_id),
    userWhoAddedId: parseString(obj.reservator_id),
    houseId: parseString(obj.house_id),
    participantAmount: parseNumber(obj.participant_amount),
    startingDate: parseDate(obj.start_time),
    endingDate: parseDate(obj.end_time),
    comment: parseOptionalString(obj.comment),
    isDecided: parseBoolean(obj.is_final),
  };
  return reservation;
};

// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseShortageFromDb = (obj: any): Shortage => {
  console.log('Hello from parseShortageFromDb');
  const shortage: Shortage = {
    id: parseString(obj.shortage_id),
    userWhoAddedId: parseString(obj.author_id),
    houseId: parseString(obj.house_id),
    content: parseString(obj.content),
    isResolved: parseBoolean(obj.resolved),
    timestamp: parseDate(obj.timestamp)
  };
  return shortage;
};

// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseNewShortage = (obj: any): NewShortage => {
  console.log('Hello from parseNewShortage');
  const shortage: NewShortage = {
    userWhoAddedId: parseString(obj.userWhoAddedId),
    houseId: parseString(obj.houseId),
    content: parseString(obj.content),
    isResolved: parseBoolean(false),
    timestamp: parseDate(dayjs().locale('fi').format())
  };
  return shortage;
};