import express from 'express';
import userService from '../services/userService';
import userData from '../dummydata/userData';
import { validateNewUser } from '../utils';

const router = express.Router();

let allUsers = userData;

router.get('/', (_req, res) => {
  console.log('all users called');
  res.status(200).json(userService.getAllUsers());
});

router.post('/', (req, res) => {
  try {
    const newUser = validateNewUser(req.body);
    const addedUser = userService.addUser(newUser);
    res.status(201).json(addedUser);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.json({
      error: `${error.message}`,
    });
  }
});

router.post('/:id', (req, res) => {
  const userId = req.params.id;
  const userToLink = allUsers.find((user) => user.id === userId);

  if (userToLink) {
    const changedUser = userService.linkHouseToUser(userToLink, 'asd');
    allUsers = allUsers.map((user) =>
      user.id !== changedUser.id ? user : changedUser
    );
    res.status(201).json({
      changed: changedUser,
      all: allUsers,
    });
  } else {
    throw new Error('No user was found with that id');
  }
});

export default router;

// user.id !== changedUser.id ? user : changedUser
