"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shortageService_1 = __importDefault(require("../services/shortageService"));
const dataParsers_1 = require("../utils/dataParsers");
const jwtHelper_1 = __importDefault(require("../utils/jwtHelper"));
const router = (0, express_1.Router)();
// Get all shortages for a house
router.get('/:houseId', (req, res, next) => {
    const houseId = req.params.houseId;
    shortageService_1.default
        .getHouseSpecificShortages(houseId)
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => next(err));
});
// TODO: Get one shortage by id for house id
// router.get('/:shortageId/:houseId', (req, res, next) => {
//   const houseId = req.params.houseId;
//   const shortageId = req.params.shortageId;
// });
// Add a new shortage
router.post('/:houseId', (req, res, next) => {
    const user = jwtHelper_1.default.decodeUser(req.cookies.token);
    const houseId = req.params.houseId;
    const shortage = (0, dataParsers_1.parseNewShortage)(Object.assign(Object.assign({}, req.body), { houseId, userWhoAddedId: user.id }));
    shortageService_1.default
        .addNewShortage(shortage)
        .then((result) => {
        res.status(201).json(result);
    })
        .catch((err) => next(err));
});
// Edit a shortage
router.put('/', (req, res, next) => {
    const shortage = (0, dataParsers_1.parseShortageFromClient)(req.body);
    console.log('shortage from req.body:', shortage);
    shortageService_1.default
        .resolveShortage(shortage)
        .then(() => {
        res.status(201).end();
    })
        .catch((err) => next(err));
});
exports.default = router;
//# sourceMappingURL=shortage.js.map