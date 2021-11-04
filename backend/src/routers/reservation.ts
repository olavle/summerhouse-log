import express from 'express';
import reservationService from '../services/reservationService';
import { parseNewReservation } from '../utils/dataParsers';
import jwtHelper from '../utils/jwtHelper';
const router = express.Router();

// Create a new reservation
router.post('/', (req, res, next) => {
  // TODO: validate the user having an access to that house
  const user = jwtHelper.decodeUser(req.cookies.token);
  const reservationToAdd = parseNewReservation({
    ...req.body,
    userWhoAddedId: user.id,
  });
  reservationService
    .createReservation(reservationToAdd)
    .then(() =>
      res.status(201).json({
        message: 'Success!',
      })
    )
    .catch((err) => next(err));
});

// Get all reservations for a houseId
router.get('/:houseId', (req, res, next) => {
  // TODO: validate the user having an access to that house
  const houseId = req.params.houseId;
  // TODO: If there are no reservations, check that it doesn't fail
  reservationService
    .getReservationsForHouse(houseId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => next(err));
});

// TODO: Get one reservation by id for houseId

export default router;
