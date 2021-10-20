import { House, NewHouse } from '../types';
import houseData from '../database/dummydata/houseData';
import { v4 as uuidv4 } from 'uuid';
import databaseHelper from '../database/databaseHelper';

const addHouse = async (house: NewHouse): Promise<House> => {
  const id = uuidv4();
  const houseToAdd: House = {
    id: id.toString(),
    ...house,
  };
  await databaseHelper.addHouseToDb(houseToAdd);
  houseData.push(houseToAdd);
  return houseToAdd;
};

export default {
  addHouse,
};
