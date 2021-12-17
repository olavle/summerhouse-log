"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageService_1 = __importDefault(require("../services/messageService"));
const replyService_1 = __importDefault(require("../services/replyService"));
const dataParsers_1 = require("../utils/dataParsers");
const jwtHelper_1 = __importDefault(require("../utils/jwtHelper"));
const router = (0, express_1.Router)();
// Get all messages for house
router.get('/:houseId', (req, res, next) => {
    const houseId = req.params.houseId;
    messageService_1.default
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
    const user = jwtHelper_1.default.decodeUser(req.cookies.token);
    const messageData = (0, dataParsers_1.parseNewMessage)(Object.assign(Object.assign({}, req.body), { userWhoAddedId: user.id }));
    messageService_1.default
        .addNewMessage(messageData)
        .then((result) => res.status(201).json(result))
        .catch((err) => next(err));
});
// MESSAGE REPLY
// Add new reply
router.post('/:messageId/replies', (req, res, next) => {
    const originalMessageId = req.params.messageId; // Should this be from req.body?
    const user = jwtHelper_1.default.decodeUser(req.cookies.token);
    const reply = (0, dataParsers_1.parseNewReply)(Object.assign(Object.assign({}, req.body), { originalMessageId, userWhoAddedId: user.id }));
    replyService_1.default
        .addNewReply(reply)
        .then((result) => res.status(201).json(result))
        .catch((err) => next(err));
});
// Get replies for a message
router.get('/:messageId/replies', (req, res, next) => {
    const originalMessageId = req.params.messageId; // Should this be from req.body?
    replyService_1.default
        .getRepliesForMessage(originalMessageId)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
});
exports.default = router;
//# sourceMappingURL=message.js.map