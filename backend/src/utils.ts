import { NewHouse, NewUser } from './types';

const isString = (param: unknown): param is string => {
  return typeof param === 'string';
};

const isNumber = (param: unknown): param is number => {
  return typeof param === 'number';
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// const isValidUser = (param: unknown): boolean => {

// }

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error(`Content is missing or in wrong format: ${text}`);
  }
  return text;
};

const parseNumber = (number: unknown): number => {
  if (!number || !isNumber(number)) {
    throw new Error(`Content is missing or in wrong format: ${number}`);
  }
  return number;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Content is missing or in wrong format: ${date}`);
  }
  return date;
};

// Disable eslint for the 'any' error to access obj properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateNewUser = (obj: any): NewUser => {
  let newUser: NewUser = {
    fname: parseString(obj.fname),
    lname: parseString(obj.lname),
    username: parseString(obj.username),
    password: parseString(obj.password),
  };
  if (obj.email) {
    newUser = {
      ...newUser,
      email: parseString(obj.email),
    };
  }
  return newUser;
};

// Disabled eslint rule to allow the use of 'any' in parameter to access obj
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateNewHouse = (obj: any): NewHouse => {
  const newHouse: NewHouse = {
    name: parseString(obj.name),
    address: parseString(obj.address),
    maxResidents: parseNumber(obj.maxResidents),
    timestamp: parseDate(new Date()),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    userWhoAdded: obj.userWhoAdded, // TEMPORARY, PLEASE VALIDATE INFO
    users: [{ // ALSO FIX THIS PLS -- is terrible
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: obj.userWhoAdded.id,
    }]
  };
  return newHouse;
};
