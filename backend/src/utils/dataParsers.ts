import { LoginUser, NewHouse, NewUser, User, UserForHouse, UserRole } from '../types';
import dayjs from 'dayjs';

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

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error(`parse-fail`);
  }
  return text;
};

const parseOptionalString = (text: unknown): string | undefined => {
  if (!text) {
    return undefined;
  }
  if (!isString(text)) {
    throw new Error(`parse-fail`);
  }
  return text;
};

const parseOptionalBoolean = (value: unknown): boolean | undefined => {
  if (!value) {
    return undefined;
  }
  if (!isBoolean(value)) {
    throw new Error(`parse-fail`);
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

const parseOptionalNumber = (number: unknown): number | undefined => {
  if (!number) {
    return undefined;
  }
  if (!isNumber(number)) {
    throw new Error(`parse-fail`);
  }
  return number;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`parse-fail`);
  }
  return date;
};

const parseRoleForNewUser = (role: unknown): UserRole | undefined => {
  if (!role) {
    return undefined;
  }
  if (!isRole(role)) {
    throw new Error(`parse-fail`);
  }
  return role;
};

const parseRoleForDbUser = (role: unknown): UserRole => {
  if (!isRole(role)) {
    throw new Error(`parse-fail`);
  }
  return role;
};

const parseUserIdList = (list: unknown): UserForHouse[] => {
  if (!list || !Array.isArray(list)) {
    throw new Error(`parse-fail`);
  }
  const finalList = list.map(item => { // check if item is type of HouseForUser
    return { 
      id: parseString(item.id)
    };
  });
  return finalList;
};

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
export const parseNewHouse = (obj: any): NewHouse => {
  console.log('Hello from parseNewHouse');
  const newHouse: NewHouse = {
    adminId: parseString(obj.adminId),
    name: parseString(obj.name),
    address: parseOptionalString(obj.address),
    maxResidents: parseOptionalNumber(obj.maxResidents),
    users: parseUserIdList(obj.users),
    timestamp: parseDate(dayjs(new Date())),
    imageUrl: parseOptionalString(obj.imageUrl)
  };

  return newHouse;
};
