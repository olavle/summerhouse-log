export interface User {
  id: string;
  fname: string;
  lname: string;
  username: string;
  password: string;
  email?: string;
  linkedHouses?: HouseForUser[];
  housesUserAdmins?: HouseForUser[];
}

export type NewUser = Omit<User, 'id'>;

interface BaseInfo {
  id: string;
  userWhoAdded: string;
}

export interface House extends BaseInfo {
  name: string;
  address?: string;
  maxResidents?: number;
  image?: string;
  timestamp: string;
  users: UserForHouse[];
}

export type NewHouse = Omit<House, 'id'>;

type HouseForUser = Pick<House, 'id'>;
type UserForHouse = Pick<User, 'id'>;

export interface NewHouseFields {
  name: unknown;
  address?: unknown;
  maxResidents?: unknown;
}

export interface Message extends BaseInfo {
  content: string;
  timestamp: string;
}

export interface MessageReply extends Message {
  originalMessage: string;
}

export interface Reservation extends BaseInfo {
  startingDate: Date;
  endingDate: string;
  comment?: string;
  isDecided: boolean;
}

export interface Shortage extends BaseInfo {
  content: string;
  timestamp: string;
}
