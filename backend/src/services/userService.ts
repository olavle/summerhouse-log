import { NewUser, User } from '../types';
import { v4 as uuidv4 } from 'uuid';
import databaseHelper from '../database/databaseHelper';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const addUser = async (user: NewUser): Promise<User> => {
  const id = uuidv4();
  const passHash = await bcrypt.hash(user.password, saltRounds);
  const userToAdd: User = {
    id,
    ...user,
    password: passHash,
  };
  await databaseHelper.addUserToDb(userToAdd);
  return userToAdd;
};

const getAllUsers = async (): Promise<User[]> => {
  return await databaseHelper.getAllUsers();
};

// TODO: make this correlate with db relations
const linkHouseToUser = (user: User, houseId: string): User => {
  user.linkedHouses?.push({
    id: houseId,
  });
  return user;
};

export default {
  addUser,
  getAllUsers,
  linkHouseToUser,
};
