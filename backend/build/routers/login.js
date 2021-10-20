"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dayjs_1 = __importDefault(require("dayjs"));
const loginService_1 = __importDefault(require("../services/loginService"));
const dataParsers_1 = require("../utils/dataParsers");
const jwtHelper_1 = __importDefault(require("../utils/jwtHelper"));
const authChecker_1 = require("../utils/authChecker");
const router = express_1.default.Router();
// Login
router.post('/', (req, res, next) => {
    console.log('From login router userIsLoggedIn:', (0, authChecker_1.userIsLoggedIn)(req.cookies.token));
    if (!(0, authChecker_1.userIsLoggedIn)(req.cookies.token)) {
        console.log('Hello from user is logged in statsu: false');
        const userFromInput = (0, dataParsers_1.parseLogin)(req.body);
        loginService_1.default
            .checkPassAndLogin(userFromInput)
            .then((jwt) => {
            console.log('jwt for login is!', jwt);
            const tokenExpirty = userFromInput.keepLoggedIn
                ? undefined
                : (0, dayjs_1.default)().add(1, 'minute').toDate(); // change expirty to 1h
            console.log('testing the jwt decode here! should return the user:', jwtHelper_1.default.decodeUser(jwt));
            res.cookie('token', jwt, {
                secure: false,
                httpOnly: true,
                expires: tokenExpirty,
            });
            res.status(200).send({
                message: 'Logged in!',
            });
        })
            .catch((err) => {
            next(err);
        });
    }
    else {
        res.status(400).json({
            message: 'User already logged in',
        });
    }
});
// Logout
router.post('/logout', (req, res, next) => {
    console.log(req.cookies.token);
    try {
        res
            .clearCookie('token')
            .json({
            message: 'Logged out!',
        })
            .end();
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=login.js.map