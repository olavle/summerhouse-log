"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownEndpoint = exports.generalError = exports.errorResponder = exports.errorLogger = void 0;
const errorLogger = (error, _req, _res, next) => {
    console.error(error);
    next(error);
};
exports.errorLogger = errorLogger;
const errorResponder = (error, req, res, next) => {
    console.log('hello from errorResponder with error:', error, 'the error message:', error.message, 'and error name:', error.name);
    if (error.message === 'no-user' || error.message === 'no-password') {
        console.log('error.name:', error.name);
        console.log('Failed login attempt from:', req.socket.remoteAddress);
        res.status(400).json({
            error: 'Incorrect credentials',
        });
    }
    if (error.message.includes('duplicate')) {
        res.status(400).json({
            error: 'The username already exists',
        });
    }
    if (error.name === 'InvalidTokenError') {
        res.status(401).json({
            message: 'Please login',
        });
    }
    else {
        next(error);
    }
};
exports.errorResponder = errorResponder;
const generalError = (error, _req, res, next) => {
    res.status(500);
    next(error);
};
exports.generalError = generalError;
const unknownEndpoint = (_req, res) => {
    res.status(404).json({
        message: 'Unkwon endpoint',
    });
};
exports.unknownEndpoint = unknownEndpoint;
//# sourceMappingURL=errorHandlers.js.map