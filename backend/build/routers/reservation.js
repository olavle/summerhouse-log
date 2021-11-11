"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reservationService_1 = __importDefault(require("../services/reservationService"));
const dataParsers_1 = require("../utils/dataParsers");
const jwtHelper_1 = __importDefault(require("../utils/jwtHelper"));
const router = express_1.default.Router();
// Create a new reservation
router.post('/', (req, res, next) => {
    // TODO: validate the user having an access to that house
    const user = jwtHelper_1.default.decodeUser(req.cookies.token);
    const reservationToAdd = (0, dataParsers_1.parseNewReservation)(Object.assign(Object.assign({}, req.body), { userWhoAddedId: user.id }));
    reservationService_1.default
        .createReservation(reservationToAdd)
        .then(() => res.status(201).json({
        message: 'Success!',
    }))
        .catch((err) => next(err));
});
// Get all reservations for a houseId
router.get('/:houseId', (req, res, next) => {
    // TODO: validate the user having an access to that house
    const houseId = req.params.houseId;
    // TODO: If there are no reservations, check that it doesn't fail
    reservationService_1.default
        .getReservationsForHouse(houseId)
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => next(err));
});
// TODO: Get one reservation by id for houseId
exports.default = router;
//# sourceMappingURL=reservation.js.map