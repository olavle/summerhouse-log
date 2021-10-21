import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import config from '../config';
import { UserForJwt } from '../types';

const secret = config.jwt_secret as string; // Casting the type to remove the possibility for 'undefined'

const encodeUser = (user: UserForJwt): string => {
  if (!user) {
    throw new Error('No user');
  }
  return jwt.sign(user, secret);
};

const decodeUser = (jwt: string): UserForJwt => {
  if (!jwt) {
    throw new Error('no-token');
  }
  return jwtDecode(jwt);
};

export default {
  encodeUser,
  decodeUser,
};