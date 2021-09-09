import express from 'express';
import houseData from '../dummydata/houseData';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('all houses called');
  res.json(houseData);
});

export default router;
