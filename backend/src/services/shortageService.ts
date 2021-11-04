import databaseHelper from '../database/databaseHelper';
import { NewShortage, Shortage } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getHouseSpecificShortages = async (
  houseId: string
): Promise<Shortage[]> => {
  return await databaseHelper.getShortagesWithHouseId(houseId);
};

const addNewShortage = async (shortage: NewShortage): Promise<void> => {
  const id = uuidv4();
  const shortageToAdd = {
    ...shortage,
    id,
  };
  await databaseHelper.addNewShortageToDb(shortageToAdd);
};

export default {
  getHouseSpecificShortages,
  addNewShortage,
};
