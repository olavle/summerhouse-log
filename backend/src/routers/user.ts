import express from 'express';
import userService from '../services/userService';
import { userIsLoggedIn, userisAdmin } from '../utils/authChecker';
import { parseNewUser } from '../utils/dataParsers';
import jwtHelper from '../utils/jwtHelper';

const router = express.Router();

// get all users
router.get('/', (req, res, next) => {
  if (userIsLoggedIn(req.cookies.token)) {
    const decodedUser = jwtHelper.decodeUser(req.cookies.token);
    if (userisAdmin(decodedUser)) {
      userService
        .getAllUsers()
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => next(err));
    } else {
      res.status(401).json({
        message: 'No authorization',
      });
    }
  } else {
    res.status(401).json({
      message: 'Please login',
    });
  }
});

// Create new user
router.post('/', (req, res, next) => {
  const newUser = parseNewUser(req.body);
  userService
    .addUser(newUser)
    .then((response) => {
      res.status(201).json({
        message: `Succesfully added new user with username ${response.username}`,
      });
    })
    .catch((err) => {
      next(err);
    });
});

// Get user by ID
// router.post('/:id', (req, res) => {
//   const userId = req.params.id;
//   const userToLink = allUsers.find((user) => user.id === userId);

//   if (userToLink) {
//     const changedUser = userService.linkHouseToUser(userToLink, 'asd');
//     allUsers = allUsers.map((user) =>
//       user.id !== changedUser.id ? user : changedUser
//     );
//     res.status(201).json({
//       changed: changedUser,
//       all: allUsers,
//     });
//   } else {
//     throw new Error('No user was found with that id');
//   }
// });

export default router;
