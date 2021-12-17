import { Message, NewMessage } from '../types';
import databaseHelper from '../database/databaseHelper';
import { v4 as uuidv4 } from 'uuid';

const getMessagesForHouseId = async (houseId: string): Promise<Message[]> => {
  return await databaseHelper.getMessagesWithRepliesForHouseIdFromDb(houseId);
};

const addNewMessage = async (message: NewMessage): Promise<Message> => {
  const messageToAdd = {
    ...message,
    id: uuidv4()
  };
  await databaseHelper.addNewMessageToDb(messageToAdd);
  return messageToAdd;
};

export default {
  getMessagesForHouseId,
  addNewMessage,
};