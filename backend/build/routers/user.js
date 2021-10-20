"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userService_1 = __importDefault(require("../services/userService"));
const authChecker_1 = require("../utils/authChecker");
const dataParsers_1 = require("../utils/dataParsers");
const jwtHelper_1 = __importDefault(require("../utils/jwtHelper"));
const router = express_1.default.Router();
// get all users
router.get('/', (req, res, next) => {
    if ((0, authChecker_1.userIsLoggedIn)(req.cookies.token)) {
        const decodedUser = jwtHelper_1.default.decodeUser(req.cookies.token);
        if ((0, authChecker_1.userisAdmin)(decodedUser)) {
            userService_1.default
                .getAllUsers()
                .then((result) => {
                res.status(200).json(result);
            })
                .catch((err) => next(err));
        }
        else {
            res.status(401).json({
                message: 'No authorization',
            });
        }
    }
    else {
        res.status(401).json({
            message: 'Please login',
        });
    }
});
// Create new user
router.post('/', (req, res, next) => {
    const newUser = (0, dataParsers_1.parseNewUser)(req.body);
    userService_1.default
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
exports.default = router;
//# sourceMappingURL=user.js.map