export interface User {
  id: string;
  fname: string;
  lname: string;
  username: string;
  password: string;
  linkedHouses?: HosueForUser[];
}

export interface House {
  id: string;
  name: string;
  address?: string;
  maxResidents?: number;
}

export type NewHouse = Omit<House, 'id'>;

type HosueForUser = Pick<House, 'id'>;

export type NewHouseFields = {
  name: unknown;
  address?: unknown;
  maxResidents?: unknown;
};
