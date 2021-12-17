export interface User {
  id: string;
  fname: string;
  lname: string;
  username: string;
  password: string;
  email?: string;
  role: UserRole;
  linkedHouses?: HouseForUser[];
  housesUserAdmins?: HouseForUser[];
}

export type UserForJwt = Omit<User, 'password'>;

export interface LoginUser {
  username: string;
  password: string;
  keepLoggedIn: boolean;
}

export interface EditableUserBasicInfo {
  fname?: string;
  lname?: string;
  email?: string;
}

export interface EditableUserPassword {
  password: string;
}

export type UserRole = 'User' | 'Admin';

export type NewUser = Omit<User, 'id'>;

export type LoggedInUser = Pick<User, 'username'>;

interface BaseInfo {
  id: string;
  userWhoAddedId: string;
}

export interface House {
  id: string;
  adminId: string;
  name: string;
  address?: string;
  maxResidents: number;
  imageUrl?: string;
  timestamp: string;
  users: UserForHouse[];
}

export type NewHouse = Omit<House, 'id'>;

export type HouseForUser = Pick<House, 'id'>;
export type UserForHouse = Pick<User, 'id' | 'username'>;

export interface NewHouseFields {
  name: unknown;
  address?: unknown;
  maxResidents?: unknown;
}

export interface Message extends BaseInfo {
  houseId: string;
  content: string;
  timestamp: string;
}

export interface MessageReply extends BaseInfo {
  content: string;
  timestamp: string;
  originalMessageId: string;
}

export interface MessageWithReplies extends Message {
  replies: MessageReply[] | [];
}

export interface Reservation extends BaseInfo {
  houseId: string;
  participantAmount: number;
  startingDate: string;
  endingDate: string;
  comment?: string;
  isDecided: boolean;
}

export type NewReservation = Omit<Reservation, 'id'>;

export interface Shortage extends BaseInfo {
  content: string;
  isResolved: boolean;
  timestamp: string;
  houseId: string;
}

export type NewShortage = Omit<Shortage, 'id'>;
export type NewMessage = Omit<Message, 'id'>;
export type NewMessageReply = Omit<MessageReply, 'id'>;
