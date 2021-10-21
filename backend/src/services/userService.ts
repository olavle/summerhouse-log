import { EditableUserBasicInfo, NewUser, User } from '../types';
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

const editUserBasicInfo = async (id: string, data: EditableUserBasicInfo): Promise<User> => {
  const user = await databaseHelper.getUserById(id);
  await databaseHelper.editUserBasicInfo(user.id, data);
  const editedUser = {
    ...user,
    ...data
  };
  return editedUser;
};

const getUserWithHouses = async (id: string): Promise<void> => {
  await databaseHelper.getUserByIdWithHousesTheyHaveAccessTo(id);
};

// const changeUserPassword = async (id: string, newPass: string): Promise<void> => {
//   const user = await databaseHelper.getUserById(id);
//   console.log('The user is:', user);
//   console.log('The new password is', newPass);
//   const hashedPass = await bcrypt.hash(newPass, saltRounds);
// };

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
  editUserBasicInfo,
  getUserWithHouses,
};
