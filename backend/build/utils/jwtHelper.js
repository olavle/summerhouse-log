"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const config_1 = __importDefault(require("../config"));
const secret = config_1.default.jwt_secret; // Casting the type to remove the possibility for 'undefined'
const encodeUser = (user) => {
    if (!user) {
        throw new Error('No user');
    }
    return jsonwebtoken_1.default.sign(user, secret);
};
const decodeUser = (jwt) => {
    if (!jwt) {
        throw new Error('No token');
    }
    return (0, jwt_decode_1.default)(jwt);
};
exports.default = {
    encodeUser,
    decodeUser,
};
//# sourceMappingURL=jwtHelper.js.map