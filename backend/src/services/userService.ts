import { NewUser, User } from '../types';
import { v4 as uuidv4 } from 'uuid';
import userData from '../dummydata/userData';
import databaseHelper from '../../databse/databaseHelper';

const addUser = (user: NewUser): User => {
  const id = uuidv4();
  const userToAdd: User = {
    id,
    ...user,
    linkedHouses: [],
    housesUserAdmins: []
  };
  databaseHelper.addUserToDb(userToAdd);

  userData.push(userToAdd);
  return userToAdd;
};

const getAllUsers = (): User[] => {
  return userData;
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
