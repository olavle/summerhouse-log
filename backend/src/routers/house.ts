import { Router } from 'express';
import houseService from '../services/houseService';
import { parseNewHouse, parseString } from '../utils/dataParsers';
import jwtHelper from '../utils/jwtHelper';

const router = Router();


// Get all houses for user
router.get('/', (req, res, next) => {
  const user = jwtHelper.decodeUser(req.cookies.token);
  console.log('Getting houses for user:', user);
  houseService
    .getUsersHouses(user.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => next(err));
});

// Get house by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log('Hello from gethousebyid, with id:', id);
  houseService
    .getAllHouseDataById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
});

// Add new house
router.post('/', (req, res, next) => {
  const token = <string>req.cookies.token;
  const user = jwtHelper.decodeUser(token);
  const houseToAdd = parseNewHouse({
    ...req.body,
    adminId: user.id,
  });
  houseToAdd.users.push({
    id: user.id,
    username: user.username,
  });
  houseService
    .addHouse(houseToAdd)
    .then((result) => {
      res.status(201).json({
        message: 'Added a new house!',
        houseAdded: result,
      });
    })
    .catch((err) => {
      next(err);
    });
});

// Grant user the access to a house
router.post('/:houseId/addUser', (req, res, next) => {
  const houseId = req.params.houseId;
  const admin = jwtHelper.decodeUser(req.cookies.token);
  const userToAddId = parseString(req.body.userId);
  houseService
    .addUserToHouse(admin.id, userToAddId, houseId)
    .then(() => {
      res.status(201).json({
        message: `Succesfully added user with id: ${userToAddId}`,
      });
    })
    .catch((err) => next(err));
});

// TODO: make it work in the DB end - gives error of foreign key constraint
// Remove house
router.delete('/:id', (req, res, next) => {
  const houseId = req.params.id;
  const user = jwtHelper.decodeUser(req.cookies.token);
  houseService
    .deleteHouse(houseId, user.id)
    .then(() => {
      res.end();
    })
    .catch((err) => next(err));
});

export default router;
