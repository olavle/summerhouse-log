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
const getHouseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const houseFromDb = yield pool.query(`
    SELECT * FROM house WHERE house_id = '${id}';
    `);
        const houseUsersFromDb = yield pool.query(`
    SELECT app_user_id, username from app_user AS a_user
    FULL JOIN house_users AS h_users
    ON a_user.app_user_id = h_users.user_id
    FULL JOIN house AS house
    ON house.house_id = h_users.house_id WHERE h_users.house_id = '${id}';
    `);
        // SELECT app_user_id, username from app_user AS a_user
        // FULL JOIN house_users AS h_users
        // ON a_user.app_user_id = h_users.user_id
        // FULL JOIN house AS house
        // ON house.house_id = h_users.house_id WHERE h_users.house_id = 'bf3bc6d1-f96d-4ec0-a0d0-c94565db3cea';
        const usersForHouse = houseUsersFromDb.rows.map((user) => {
            return {
                id: (0, dataParsers_1.parseString)(user.app_user_id),
                username: (0, dataParsers_1.parseString)(user.username),
            };
        });
        const fullHouseData = (0, dataParsers_1.parseHouseFromDb)(houseFromDb.rows[0], usersForHouse);
        console.log(fullHouseData);
        //   const response = await pool.query(`
        // SELECT app_user_id from app_user AS u
        // FULL JOIN house_users AS h_users
        // ON u.app_user_id = h_users.user_id
        // FULL JOIN house AS house
        // ON h_users.house_id = house.house_id WHERE h_users.user_id = '${id}';
        // `);
        // vanha versio
        //   const response = await pool.query(`
        //   SELECT * from house AS house
        //   FULL JOIN house_users AS h_users
        //   ON house.house_id = h_users.house_id
        //   FULL JOIN app_user AS a_user
        //   ON a_user.app_user_id = h_users.user_id WHERE h_users.house_id = '${id}';
        // `);
        // const usersForHouse = response.rows.map(item => {
        //   return {
        //     id: parseString(item.user_id),
        //   };
        // });
        // console.log(usersForHouse);
        // const house = parseHouseFromDb({
        //   house_id: response.rows[0].house_id,
        //   admin_id: response.rows[0].admin_id,
        //   name: response.rows[0].name,
        //   address: response.rows[0].address,
        //   max_residents: response.rows[0].max_residents,
        //   users: usersForHouse,
        // });
        if (houseFromDb.rowCount === 0) {
            throw new Error();
        }
        return fullHouseData;
    }
    catch (error) {
        console.log(error);
        throw new Error('no-house');
    }
});
const removeHouseById = (houseId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query(`
  DELETE FROM house WHERE house_id = '${houseId}' AND admin_id = '${userId}';
  `);
    console.log(result);
});
const addUserToHouse = (user_id, house_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.query(`
  INSERT INTO house_users VALUES (
    '${user_id}',
    '${house_id}'
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
const editUserBasicInfo = (id, { fname, lname, email }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query(`
  UPDATE app_user SET first_name = '${fname}', last_name = '${lname}', email = '${email}' WHERE app_user_id = '${id}';
  `);
    if (result.rowCount === 0) {
        throw new Error('no-user');
    }
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
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield pool.query(`
      SELECT * FROM app_user WHERE app_user_id = '${id}';
    `);
    if (response.rows[0] === undefined) {
        throw new Error('no-user');
    }
    return (0, dataParsers_1.parseUserFromDb)(response.rows[0]);
});
const getUserByIdWithHousesTheyHaveAccessTo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Returns house info
    // const response = await pool.query(`
    // SELECT house.* FROM app_user
    // RIGHT JOIN house_users ON (house_users.user_id = app_user.app_user_id)
    // RIGHT JOIN house ON (house.house_id = house_users.house_id) WHERE app_user_id = '${id}';
    // `);
    // TODO: make it return also the users linked with the house?
    const result = yield pool.query(`
  SELECT * from house AS house
  FULL JOIN house_users AS h_users
  ON house.house_id = h_users.house_id
  WHERE h_users.user_id = '${id}';
  `);
    // Return user, should return house info
    // const response = await pool.query(`
    // SELECT app_user_id from app_user AS u
    // FULL JOIN house_users AS h_users
    // ON u.app_user_id = h_users.user_id
    // FULL JOIN house AS house
    // ON h_users.house_id = house.house_id WHERE h_users.user_id = '${id}';
    // `);
    const toReturn = result.rows.map(item => {
        return (0, dataParsers_1.parseHouseFromDb)(item);
    });
    return toReturn;
});
// https://www.sqlshack.com/sql-multiple-joins-for-beginners-with-examples/
// Get all data of a house
// SELECT * FROM house AS h
// FULL JOIN house_users as hu
// ON h.house_id = hu.house_id
// FULL JOIN app_user AS a
// ON hu.user_id = a.app_user_id WHERE hu.house_id = 'ID for eka mökki';
const createNewReservation = ({ id, userWhoAddedId, houseId, participantAmount, startingDate, endingDate, comment, isDecided, }) => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.query(`
  INSERT INTO reservation VALUES (
    '${id}',
    '${userWhoAddedId}',
    '${houseId}',
    '${participantAmount}',
    '${startingDate}',
    '${endingDate}',
    '${comment}',
    '${isDecided}'
  );
  `);
});
const getAllReservationsForHouseId = (houseId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query(`
    SELECT * FROM reservation WHERE house_id = '${houseId}';
  `);
    const allReservations = result.rows.map((item) => {
        return (0, dataParsers_1.parseReservationFromDb)(item);
    });
    return allReservations;
});
const getShortagesWithHouseId = (houseId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query(`
  SELECT * FROM shortage WHERE house_id = '${houseId}';
  `);
    const shortages = result.rows.map((item) => {
        return (0, dataParsers_1.parseShortageFromDb)(item);
    });
    return shortages;
});
const addNewShortageToDb = ({ id, userWhoAddedId, houseId, content, isResolved, timestamp, }) => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.query(`
  INSERT INTO shortage VALUES (
    '${id}',
    '${userWhoAddedId}',
    '${houseId}',
    '${content}',
    '${isResolved}',
    '${timestamp}'
  );
  `);
});
const resolveShortage = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.query(`
  UPDATE shortage SET resolved = '${obj.isResolved}' WHERE shortage_id = '${obj.id}';
  `);
});
const getMessagesForHouseIdFromDb = (houseId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query(`
    SELECT * FROM message WHERE house_id='${houseId}';
  `);
    const results = result.rows.map((item) => {
        return (0, dataParsers_1.parseMessageFromDb)(item);
    });
    return results;
});
const addNewMessageToDb = ({ id, userWhoAddedId, houseId, content, timestamp, }) => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.query(`
  INSERT INTO message VALUES (
    '${id}',
    '${userWhoAddedId}',
    '${houseId}',
    '${content}',
    '${timestamp}'
  );
  `);
});
const addNewReplyToDb = ({ id, userWhoAddedId, content, timestamp, originalMessageId, }) => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.query(`
    INSERT INTO message_reply VALUES (
      '${id}',
      '${userWhoAddedId}',
      '${originalMessageId}',
      '${content}',
      '${timestamp}'
    );
  `);
});
const getRepliesForMessage = (messageId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query(`
  SELECT * FROM message_reply WHERE reply_to_id = '${messageId}';
  `);
    const results = result.rows.map((item) => {
        return (0, dataParsers_1.parseReplyFromDb)(item);
    });
    return results;
});
exports.default = {
    seedDataBase,
    addUserToDb,
    // getAllUsersWithHouses,
    getAllUsers,
    getUserByUsername,
    addHouseToDb,
    getUserById,
    editUserBasicInfo,
    getUserByIdWithHousesTheyHaveAccessTo,
    addUserToHouse,
    getHouseById,
    removeHouseById,
    createNewReservation,
    getAllReservationsForHouseId,
    getShortagesWithHouseId,
    addNewShortageToDb,
    getMessagesForHouseIdFromDb,
    addNewMessageToDb,
    addNewReplyToDb,
    getRepliesForMessage,
    resolveShortage
};
//# sourceMappingURL=databaseHelper.js.map