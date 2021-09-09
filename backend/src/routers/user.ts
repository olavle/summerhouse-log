import express from 'express';
import userData from '../dummydata/userData';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('all users called');
  res.json(userData);
});

export default router;
