import { NewUser, User } from '../types';
import { v4 as uuidv4 } from 'uuid';
import userData from '../dummydata/userData';
import databaseHelper from '../databaseHelper';

const addUser = (user: NewUser): User => {
  const id = uuidv4();
  console.log(`uuidv4 returned ${id}`);
  const userToAdd: User = {
    id,
    ...user,
    linkedHouses: [],
    housesUserAdmins: []
  };
  // const asd = databaseHelper.addUserToDb(userToAdd);
  databaseHelper.addUserToDb(userToAdd);

  // console.log('testing asd', asd);
  userData.push(userToAdd);
  return userToAdd;
};

const getAllUsers = (): User[] => {
  return userData;
};


// TODO: check if connections should be made in the database instead
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
