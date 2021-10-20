"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const user_1 = __importDefault(require("./routers/user"));
const house_1 = __importDefault(require("./routers/house"));
const login_1 = __importDefault(require("./routers/login"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("./config"));
const errorHandlers_1 = require("./middleware/errorHandlers");
// import databaseHelper from './database/databaseHelper'; // Uncomment if need to seed database
const app = (0, express_1.default)();
const port = config_1.default.port;
// databaseHelper.seedDataBase(); // Uncomment if need to seed database
app.use((0, express_1.json)());
app.use((0, cookie_parser_1.default)());
app.use('/api/users', user_1.default);
app.use('/api/houses', house_1.default);
app.use('/api/login', login_1.default);
// Error handlers
app.use(errorHandlers_1.errorLogger);
app.use(errorHandlers_1.errorResponder);
app.use(errorHandlers_1.generalError);
app.use(errorHandlers_1.unknownEndpoint);
app.listen(port, () => {
    console.log('listening to port', 3001);
});
//# sourceMappingURL=index.js.map