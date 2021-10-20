"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIsLoggedIn = exports.userisAdmin = void 0;
const userisAdmin = (user) => {
    return user.role === 'Admin';
};
exports.userisAdmin = userisAdmin;
const userIsLoggedIn = (token) => {
    console.log('userIsLoggedIn token:', token);
    console.log('userIsLoggedIn return statement: ', !token ? false : true);
    return !token ? false : true;
};
exports.userIsLoggedIn = userIsLoggedIn;
//# sourceMappingURL=authChecker.js.map