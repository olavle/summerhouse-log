"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    db: {
        user: process.env.POSTGRESQL_USER,
        host: process.env.POSTGRESQL_HOST,
        db: process.env.POSTGRESQL_DB,
        pw: process.env.POSTGRESQL_PW,
        port: process.env.POSTGRESQL_PORT,
    },
    jwt_secret: process.env.JWT_SECRET,
};
//# sourceMappingURL=config.js.map