import { v4 as uuidv4 } from 'uuid';
import { MessageReply, NewMessageReply } from '../types';
import databaseHelper from '../database/databaseHelper';

const addNewReply = async (reply: NewMessageReply): Promise<MessageReply> => {
  const replyToAdd = {
    ...reply,
    id: uuidv4(),
  };
  await databaseHelper.addNewReplyToDb(replyToAdd);
  return replyToAdd;
};

const getRepliesForMessage = async (messageId: string): Promise<MessageReply[]> => {
  return await databaseHelper.getRepliesForMessage(messageId);
};

export default {
  addNewReply,
  getRepliesForMessage
};