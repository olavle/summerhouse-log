import express from 'express';
import houseData from '../dummydata/houseData';
import { validateNewHouse } from '../utils';
import houseService from '../services/houseService';

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
router.post('/', (req, res) => {
  try {
    const newHouse = validateNewHouse(req.body);
    const addedHouse = houseService.addHouse(newHouse);
    res.status(201).json(addedHouse);
  // Disabled elsint to access error message
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      error: `${error.message}`,
    });
  }
});

export default router;
