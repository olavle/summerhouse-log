import { UserForJwt } from '../types';

export const userisAdmin = (user: UserForJwt): boolean => {
  return user.role === 'Admin';
};

export const userIsLoggedIn = (token: string): boolean => {
  return !token ? false : true;
};
