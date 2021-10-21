import express from 'express';
import userService from '../services/userService';
import { userisAdmin } from '../utils/authChecker';
import { parseNewUser, parseUserToEdit } from '../utils/dataParsers';
import jwtHelper from '../utils/jwtHelper';

const router = express.Router();

// get all users
router.get('/', (req, res, next) => {
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

// Edit existing user
router.put('/editBasicInfo', (req, res, next) => {
  const userFromJwt = jwtHelper.decodeUser(req.cookies.token);
  const userChanges = parseUserToEdit(req.body, userFromJwt);
  userService
    .editUserBasicInfo(userFromJwt.id, userChanges)
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => next(err));
});

// Change password
// router.put('/changePassword', (req, res, next) => {
//   const userFromJwt = jwtHelper.decodeUser(req.cookies.token);
//   const newPass = parseUserPasswordToEdit(req.body);

// });

// Get user by id with houses
router.get('/userWithHouses', (req, res, next) => {
  const user = jwtHelper.decodeUser(req.cookies.token);
  userService.getUserWithHouses(user.id).then(() => {
    res.end();
  }).catch((err) => next(err));
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
