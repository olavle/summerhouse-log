"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = __importDefault(require("../config"));
const dataParsers_1 = require("../utils/dataParsers");
const creationStatements_1 = require("./creationStatements");
const user = config_1.default.db.user;
const host = config_1.default.db.host;
const database = config_1.default.db.db;
const password = config_1.default.db.pw;
const port = Number(config_1.default.db.port);
const pool = new pg_1.Pool({
    user,
    host,
    database,
    password,
    port,
});
const seedDataBase = () => {
    pool.connect((err, client, done) => {
        if (err)
            throw err;
        client.query(creationStatements_1.tableCreationStatements, (err, _res) => {
            done();
            if (err) {
                console.log(err);
                console.log('error with table creation');
                return;
            }
            else {
                pool.connect((err, client, done) => {
                    if (err)
                        throw err;
                    client.query(creationStatements_1.databaseSeedStatements, (err, _res) => {
                        done();
                        if (err) {
                            console.log(err);
                            console.log('Error with seeding');
                            return;
                        }
                        else {
                            console.log('Database has been seeded');
                        }
                    });
                });
            }
        });
    });
};
const addHouseToDb = ({ id, adminId, name, address, maxResidents, imageUrl, timestamp, }) => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.query(`
    INSERT INTO house VALUES (
      '${id}',
      '${adminId}',
      '${name}',
      '${address}',
      '${maxResidents}',
      '${imageUrl}',
      '${timestamp}'
    );
  `);
});
// SELECT app_user.*, house.* FROM app_user RIGHT JOIN houses_user_has_access_to ON (houses_user_has_access_to.user_id = app_user.id) RIGHT JOIN house ON (house.id = houses_user_has_access_to.house_id);
// const getAllUsersWithHouses = () => {
//   pool
//     .query(
//       `
//     SELECT app_user.*, house.* FROM app_user
//     RIGHT JOIN houses_user_has_access_to ON (houses_user_has_access_to.user_id = app_user.app_user_id)
//     RIGHT JOIN house ON (house.house_id = houses_user_has_access_to.house_id);
//   `
//     )
//     .then((res) => {
//       console.log(res.rows);
//       // return res.rows[1];
//     })
//     .catch((err) => {
//       throw err;
//     });
// };
const addUserToDb = ({ id, fname, lname, username, password, email, role, }) => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.query(`
  INSERT INTO app_user VALUES (
    '${id}',
    '${fname}',
    '${lname}',
    '${username}',
    '${password}',
    '${email}',
    '${role}'
  );`);
    // // The error from database is found in the 'detail' section as seen above
    //   console.log('response from useradd in databasehelper', response);
    //   // if (response.rows[0] === undefined) {
    //   //   throw new Error('db-error');
    //   // }
    //   // return parseUserFromDb(response.rows[0]);
    // return 'hello';
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Called getAllUsers in databasehelper');
    const response = yield pool.query(`
      SELECT * FROM app_user;
    `);
    const users = response.rows.map((user) => {
        return (0, dataParsers_1.parseUserFromDb)(user);
    });
    return users;
});
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield pool.query(`
      SELECT * FROM app_user WHERE username = '${username}';
    `);
    if (response.rows[0] === undefined) {
        throw new Error('no-user');
    }
    return (0, dataParsers_1.parseUserFromDb)(response.rows[0]);
});
exports.default = {
    seedDataBase,
    addUserToDb,
    // getAllUsersWithHouses,
    getAllUsers,
    getUserByUsername,
    addHouseToDb,
};
//# sourceMappingURL=databaseHelper.js.map