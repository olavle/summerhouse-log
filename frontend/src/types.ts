export type State = {
  isLoggedIn: boolean;
  username: string;
  userPassword: string;
  stayLoggedIn: boolean;
  houses: House[];
  houseToEdit: House;
  reservations: Reservation[];
  shortages: Shortage[];
  shortageInputOpen: boolean;
  newShortage: string;
  messages: Message[];
  messageReplies: MessageReply[];
  newMessageInput: string;
  newMessageReplyInput: string;
}

interface BaseInfo {
  id: string;
  userWhoAddedId: string;
}

export interface HouseUser {
  id: string;
  username: string;
}

export interface House {
  id: string;
  adminId: string;
  name: string;
  address?: string;
  maxResidents: number;
  imageUrl?: string;
  timestamp: string;
  users: HouseUser[] | [];
}

export interface User {
  id: string;
  fname: string;
  lname: string;
  username: string;
  password: string;
  email?: string;
  // linkedHouses?: HouseForUser[];
  // housesUserAdmins?: HouseForUser[];
}

export interface Reservation {
  id: string;
  userWhoAddedId: string;
  houseId: string;
  participantAmount: number;
  startingDate: string;
  endingDate: string;
  comment?: string;
  isDecided: boolean;
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

export interface Shortage extends BaseInfo {
  content: string;
  isResolved: boolean;
  timestamp: string;
  houseId: string;
}
