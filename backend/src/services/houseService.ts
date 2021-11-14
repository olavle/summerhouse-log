import { House, NewHouse, UserForHouse } from '../types';
import { v4 as uuidv4 } from 'uuid';
import databaseHelper from '../database/databaseHelper';
import { userExists } from '../utils/userChecker';

const addHouse = async (house: NewHouse): Promise<House> => {
  try {
    const id = uuidv4();
    let houseToAdd: House = {
      id,
      ...house,
    };
    await databaseHelper.addHouseToDb(houseToAdd);
    const usersToAdd: UserForHouse[] = [];
    houseToAdd.users.forEach((item) => {
      if (usersToAdd.filter((user) => user.id === item.id).length === 0) {
        usersToAdd.push(item);
      }
    });
    usersToAdd.forEach((user) => {
      databaseHelper
        .addUserToHouse(user.id, houseToAdd.id)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: any) => {
          console.log(err);
          throw new Error(err.message);
        });
    });
    houseToAdd = {
      ...houseToAdd,
      users: usersToAdd,
    };
    console.log('houseToadd:', houseToAdd);
    return houseToAdd;
  } catch (error) {
    throw new Error('db-error');
  }
};

const addUserToHouse = async (
  adminUserId: string,
  userToAddId: string,
  houseForUserId: string
): Promise<void> => {
  try {
    const houseTheUserIsAddedTo = await databaseHelper.getHouseById(
      houseForUserId
    );
    if (houseTheUserIsAddedTo.adminId !== adminUserId) {
      throw new Error('admin-error');
    }
    if (!(await userExists(userToAddId))) {
      throw new Error('no-userToAdd');
    }
    // TODO check if the user already belongs to the house
    await databaseHelper.addUserToHouse(userToAddId, houseForUserId);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getAllHouseDataById = async (id: string): Promise<House> => {
  return await databaseHelper.getHouseById(id);
};

const deleteHouse = async (houseId: string, adminId: string): Promise<void> => {
  await databaseHelper.removeHouseById(houseId, adminId);
};

const getUsersHouses = async (id: string): Promise<House[]> => {
  return await databaseHelper.getUserByIdWithHousesTheyHaveAccessTo(id);
};

export default {
  addHouse,
  addUserToHouse,
  getAllHouseDataById,
  deleteHouse,
  getUsersHouses,
};
