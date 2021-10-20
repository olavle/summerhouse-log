import bcrypt from 'bcrypt';
import { LoginUser, User, UserForJwt } from '../types';
import databaseHelper from '../database/databaseHelper';
import jwtHelper from '../utils/jwtHelper';

const passWordIsCorrect = async (user: User, passwordFromInput: string): Promise<boolean> => {
  const passwordFromDb = user.password;
  return await bcrypt.compare(passwordFromInput, passwordFromDb);
};

const checkPassAndLogin = async (userFromInput: LoginUser): Promise<string> => {
  const userFromDb = await databaseHelper.getUserByUsername(userFromInput.username);
  if (!await passWordIsCorrect(userFromDb, userFromInput.password)) {
    throw new Error('no-password');
  }
  const userForJwt: UserForJwt = {
    id: userFromDb.id,
    fname: userFromDb.fname,
    lname: userFromDb.lname,
    username: userFromDb.username,
    email: userFromDb.email,
    role: userFromDb.role,
  };
  return jwtHelper.encodeUser(userForJwt);
};

export default {
  passWordIsCorrect,
  checkPassAndLogin,
};
