"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const houseData_1 = __importDefault(require("../database/dummydata/houseData"));
const houseService_1 = __importDefault(require("../services/houseService"));
const authChecker_1 = require("../utils/authChecker");
const dataParsers_1 = require("../utils/dataParsers");
const jwtHelper_1 = __importDefault(require("../utils/jwtHelper"));
const router = express_1.default.Router();
// Get all houses
router.get('/', (_req, res) => {
    console.log('all houses called');
    res.json(houseData_1.default);
});
// Get house by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log('Called one house with id', id);
    const toReturn = houseData_1.default.filter((house) => house.id === id);
    res.json(toReturn);
});
// Add new house
router.post('/', (req, res, next) => {
    try {
        const token = req.cookies.token;
        if ((0, authChecker_1.userIsLoggedIn)(req.cookies.token)) {
            const user = jwtHelper_1.default.decodeUser(token);
            const houseToAdd = (0, dataParsers_1.parseNewHouse)(Object.assign(Object.assign({}, req.body), { adminId: user.id }));
            houseService_1.default.addHouse(houseToAdd).catch((err) => {
                throw err;
            });
            res.status(201).json({
                message: 'Added new house!',
            });
        }
        res.status(401).json({
            message: 'Please login'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=house.js.map