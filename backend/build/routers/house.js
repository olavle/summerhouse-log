"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const houseService_1 = __importDefault(require("../services/houseService"));
const dataParsers_1 = require("../utils/dataParsers");
const jwtHelper_1 = __importDefault(require("../utils/jwtHelper"));
const router = express_1.default.Router();
// Get all houses for user
router.get('/', (req, res, next) => {
    const user = jwtHelper_1.default.decodeUser(req.cookies.token);
    houseService_1.default
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
    houseService_1.default
        .getAllHouseDataById(id)
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => console.log(err));
});
// Add new house
router.post('/', (req, res, next) => {
    const token = req.cookies.token;
    const user = jwtHelper_1.default.decodeUser(token);
    const houseToAdd = (0, dataParsers_1.parseNewHouse)(Object.assign(Object.assign({}, req.body), { adminId: user.id }));
    houseToAdd.users.push({
        id: user.id,
        username: user.username,
    });
    houseService_1.default
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
    const admin = jwtHelper_1.default.decodeUser(req.cookies.token);
    const userToAddId = (0, dataParsers_1.parseString)(req.body.userId);
    houseService_1.default
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
    const user = jwtHelper_1.default.decodeUser(req.cookies.token);
    houseService_1.default
        .deleteHouse(houseId, user.id)
        .then(() => {
        res.end();
    })
        .catch((err) => next(err));
});
exports.default = router;
//# sourceMappingURL=house.js.map