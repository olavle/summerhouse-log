import { UserForJwt } from '../types';
import databaseHelper from '../database/databaseHelper';

export const userisAdmin = (user: UserForJwt): boolean => {
  return user.role === 'Admin';
};

export const userIsLoggedIn = (token: string): boolean => {
  return !token ? false : true;
};

export const userExists = async (id: string): Promise<boolean> => {
  try {
    const result = await databaseHelper.getUserById(id);
    return !result ? false : true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
