import { NewReservation, Reservation } from '../types';
import databaseHelper from '../database/databaseHelper';
import { v4 as uuidv4 } from 'uuid';

const createReservation = async (reservation: NewReservation): Promise<void> => {
  const id = uuidv4();
  const fullReservation = {
    ...reservation,
    id,
  };
  await databaseHelper.createNewReservation(fullReservation);
};

const getReservationsForHouse = async (houseId: string): Promise<Reservation[]> => {
  return await databaseHelper.getAllReservationsForHouseId(houseId);
};

export default {
  createReservation,
  getReservationsForHouse,
};
