import { Router } from 'express';
import shortageService from '../services/shortageService';
import { parseNewShortage, parseShortageFromClient } from '../utils/dataParsers';
import jwtHelper from '../utils/jwtHelper';

const router = Router();

// Get all shortages for a house
router.get('/:houseId', (req, res, next) => {
  const houseId = req.params.houseId;
  shortageService
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
  const user = jwtHelper.decodeUser(req.cookies.token);
  const houseId = req.params.houseId;
  const shortage = parseNewShortage({
    ...req.body,
    houseId,
    userWhoAddedId: user.id,
  });
  shortageService
    .addNewShortage(shortage)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => next(err));
});

// Edit a shortage
router.put('/', (req, res, next) => {
  const shortage = parseShortageFromClient(req.body);
  console.log('shortage from req.body:', shortage);
  shortageService
    .resolveShortage(shortage)
    .then(() => {
      res.status(201).end();
    })
    .catch((err) => next(err));
});

export default router;
