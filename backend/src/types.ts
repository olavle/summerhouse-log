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

type HosueForUser = Pick<House, 'id'>;
