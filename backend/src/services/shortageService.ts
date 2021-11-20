import databaseHelper from '../database/databaseHelper';
import { NewShortage, Shortage } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getHouseSpecificShortages = async (
  houseId: string
): Promise<Shortage[]> => {
  return await databaseHelper.getShortagesWithHouseId(houseId);
};

const addNewShortage = async (shortage: NewShortage): Promise<Shortage> => {
  const id = uuidv4();
  const shortageToAdd = {
    ...shortage,
    id,
  };
  await databaseHelper.addNewShortageToDb(shortageToAdd);
  return shortageToAdd;
};

const resolveShortage = async (obj: Shortage): Promise<void> => {
  await databaseHelper.resolveShortage(obj);
};

export default {
  getHouseSpecificShortages,
  addNewShortage,
  resolveShortage
};
