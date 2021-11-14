
export type State = {
  isLoggedIn: boolean;
  username: string;
  userPassword: string;
  stayLoggedIn: boolean;
  houses: House[];
};

export interface House {
  id: string;
  adminId: string;
  name: string;
  address?: string;
  maxResidents: number;
  imageUrl?: string;
  timestamp: string;
}