import { NewHouse } from './types';

const isString = (param: unknown): param is string => {
  return typeof param === 'string';
};

const isNumber = (param: unknown): param is number => {
  return typeof param === 'number';
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error(`Content is missing or in wrong format: ${text}`);
  }
  return text;
};

export const parseNumber = (number: unknown): number => {
  if (!number || !isNumber(number)) {
    throw new Error(`Content is missing or in wrong format: ${number}`);
  }
  return number;
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Content is missing or in wrong format: ${date}`);
  }
  return date;
};

// Disabled eslint rule to allow the use of 'any'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewHouseEntry = (obj: any): NewHouse => {
  const newHouse: NewHouse = {
    name: parseString(obj.name),
    address: parseString(obj.address),
    maxResidents: parseNumber(obj.maxResidents),
  };
  return newHouse;
};
