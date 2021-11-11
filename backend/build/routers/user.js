"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userService_1 = __importDefault(require("../services/userService"));
const userChecker_1 = require("../utils/userChecker");
const dataParsers_1 = require("../utils/dataParsers");
const jwtHelper_1 = __importDefault(require("../utils/jwtHelper"));
const router = express_1.default.Router();
// get all users
router.get('/', (req, res, next) => {
    const decodedUser = jwtHelper_1.default.decodeUser(req.cookies.token);
    if ((0, userChecker_1.userisAdmin)(decodedUser)) {
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
// Edit existing user
router.put('/editBasicInfo', (req, res, next) => {
    const userFromJwt = jwtHelper_1.default.decodeUser(req.cookies.token);
    const userChanges = (0, dataParsers_1.parseUserToEdit)(req.body, userFromJwt);
    userService_1.default
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
    const user = jwtHelper_1.default.decodeUser(req.cookies.token);
    userService_1.default.getUserWithHouses(user.id).then(() => {
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
exports.default = router;
//# sourceMappingURL=user.js.map