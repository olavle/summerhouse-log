import { Router } from 'express';
import messageService from '../services/messageService';
import replyService from '../services/replyService';
import { parseNewMessage, parseNewReply } from '../utils/dataParsers';
import jwtHelper from '../utils/jwtHelper';

const router = Router();

// Get all messages for house
router.get('/:houseId', (req, res, next) => {
  const houseId = req.params.houseId;
  messageService
    .getMessagesForHouseId(houseId)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => next(err));
});

// Add a new message
// TODO: Check if the user has access to the house in question
router.post('/', (req, res, next) => {
  const user = jwtHelper.decodeUser(req.cookies.token);

  const messageData = parseNewMessage({
    ...req.body,
    userWhoAddedId: user.id,
  });

  messageService
    .addNewMessage(messageData)
    .then((result) => res.status(201).json(result))
    .catch((err) => next(err));
});

// MESSAGE REPLY
// Add new reply
router.post('/:messageId/replies', (req, res, next) => {
  const originalMessageId = req.params.messageId; // Should this be from req.body?
  const user = jwtHelper.decodeUser(req.cookies.token);
  const reply = parseNewReply({
    ...req.body,
    originalMessageId,
    userWhoAddedId: user.id,
  });
  replyService
    .addNewReply(reply)
    .then((result) =>
      res.status(201).json(result)
    )
    .catch((err) => next(err));
});

// Get replies for a message
router.get('/:messageId/replies', (req, res, next) => {
  const originalMessageId = req.params.messageId; // Should this be from req.body?
  replyService
    .getRepliesForMessage(originalMessageId)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err));
});

export default router;
