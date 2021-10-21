import express from 'express';
import houseData from '../database/dummydata/houseData';
import houseService from '../services/houseService';
import { parseNewHouse } from '../utils/dataParsers';
import jwtHelper from '../utils/jwtHelper';

const router = express.Router();

// Get all houses
router.get('/', (_req, res) => {
  console.log('all houses called');
  res.json(houseData);
});

// Get house by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log('Called one house with id', id);
  const toReturn = houseData.filter((house) => house.id === id);
  res.json(toReturn);
});

// Add new house
router.post('/', (req, res, next) => {
  try {
    const token = <string>req.cookies.token;

    const user = jwtHelper.decodeUser(token);
    const houseToAdd = parseNewHouse({
      ...req.body,
      adminId: user.id,
    });
    houseService.addHouse(houseToAdd).catch((err) => {
      throw err;
    });
    res.status(201).json({
      message: 'Added new house!',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
