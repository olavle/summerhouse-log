import { Pool } from 'pg';
import config from '../config';
import {
  EditableUserBasicInfo,
  House,
  Message,
  MessageReply,
  // MessageWithReplies,
  Reservation,
  Shortage,
  User,
} from '../types';
import {
  parseUserFromDb,
  parseHouseFromDb,
  parseString,
  parseReservationFromDb,
  parseShortageFromDb,
  parseMessageFromDb,
  parseReplyFromDb,
  // parseMessageWithRepliesFromDb,
} from '../utils/dataParsers';
import {
  tableCreationStatements,
  databaseSeedStatements,
} from './creationStatements';

const user = config.db.user;
const host = config.db.host;
const database = config.db.db;
const password = config.db.pw;
const port = Number(config.db.port);

const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
});

const seedDataBase = (): void => {
  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query(tableCreationStatements, (err, _res) => {
      done();

      if (err) {
        console.log(err);
        console.log('error with table creation');
        return;
      } else {
        pool.connect((err, client, done) => {
          if (err) throw err;
          client.query(databaseSeedStatements, (err, _res) => {
            done();

            if (err) {
              console.log(err);
              console.log('Error with seeding');
              return;
            } else {
              console.log('Database has been seeded');
            }
          });
        });
      }
    });
  });
};

const addHouseToDb = async ({
  id,
  adminId,
  name,
  address,
  maxResidents,
  imageUrl,
  timestamp,
}: House): Promise<void> => {
  await pool.query(`
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
};

const getHouseById = async (id: string): Promise<House> => {
  try {
    const houseFromDb = await pool.query(`
    SELECT * FROM house WHERE house_id = '${id}';
    `);

    const houseUsersFromDb = await pool.query(`
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
        id: parseString(user.app_user_id),
        username: parseString(user.username),
      };
    });

    const fullHouseData = parseHouseFromDb(houseFromDb.rows[0], usersForHouse);
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
  } catch (error) {
    console.log(error);
    throw new Error('no-house');
  }
};

const removeHouseById = async (
  houseId: string,
  userId: string
): Promise<void> => {
  const result = await pool.query(`
  DELETE FROM house WHERE house_id = '${houseId}' AND admin_id = '${userId}';
  `);
  console.log(result);
};

const addUserToHouse = async (
  user_id: string,
  house_id: string
): Promise<void> => {
  await pool.query(`
  INSERT INTO house_users VALUES (
    '${user_id}',
    '${house_id}'
  );
  `);
};

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

const addUserToDb = async ({
  id,
  fname,
  lname,
  username,
  password,
  email,
  role,
}: User): Promise<void> => {
  await pool.query(
    `
  INSERT INTO app_user VALUES (
    '${id}',
    '${fname}',
    '${lname}',
    '${username}',
    '${password}',
    '${email}',
    '${role}'
  );`
  );
  // // The error from database is found in the 'detail' section as seen above
  //   console.log('response from useradd in databasehelper', response);

  //   // if (response.rows[0] === undefined) {
  //   //   throw new Error('db-error');
  //   // }

  //   // return parseUserFromDb(response.rows[0]);
  // return 'hello';
};

const editUserBasicInfo = async (
  id: string,
  { fname, lname, email }: EditableUserBasicInfo
): Promise<void> => {
  const result = await pool.query(`
  UPDATE app_user SET first_name = '${fname}', last_name = '${lname}', email = '${email}' WHERE app_user_id = '${id}';
  `);
  if (result.rowCount === 0) {
    throw new Error('no-user');
  }
};

const getAllUsers = async (): Promise<User[]> => {
  console.log('Called getAllUsers in databasehelper');
  const response = await pool.query(
    `
      SELECT * FROM app_user;
    `
  );
  const users: User[] = response.rows.map((user) => {
    return parseUserFromDb(user);
  });
  return users;
};

const getUserByUsername = async (username: string): Promise<User> => {
  const response = await pool.query(`
      SELECT * FROM app_user WHERE username = '${username}';
    `);
  if (response.rows[0] === undefined) {
    throw new Error('no-user');
  }
  return parseUserFromDb(response.rows[0]);
};

const getUserById = async (id: string): Promise<User> => {
  const response = await pool.query(`
      SELECT * FROM app_user WHERE app_user_id = '${id}';
    `);
  if (response.rows[0] === undefined) {
    throw new Error('no-user');
  }
  return parseUserFromDb(response.rows[0]);
};

const getUserByIdWithHousesTheyHaveAccessTo = async (
  id: string
): Promise<House[]> => {
  // Returns house info
  // const response = await pool.query(`
  // SELECT house.* FROM app_user
  // RIGHT JOIN house_users ON (house_users.user_id = app_user.app_user_id)
  // RIGHT JOIN house ON (house.house_id = house_users.house_id) WHERE app_user_id = '${id}';
  // `);

  // TODO: make it return also the users linked with the house?
  const result = await pool.query(`
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
  const toReturn = result.rows.map((item) => {
    return parseHouseFromDb(item);
  });
  return toReturn;
};

// https://www.sqlshack.com/sql-multiple-joins-for-beginners-with-examples/
// Get all data of a house
// SELECT * FROM house AS h
// FULL JOIN house_users as hu
// ON h.house_id = hu.house_id
// FULL JOIN app_user AS a
// ON hu.user_id = a.app_user_id WHERE hu.house_id = 'ID for eka mökki';

const createNewReservation = async ({
  id,
  userWhoAddedId,
  houseId,
  participantAmount,
  startingDate,
  endingDate,
  comment,
  isDecided,
}: Reservation): Promise<void> => {
  await pool.query(`
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
};

const getAllReservationsForHouseId = async (
  houseId: string
): Promise<Reservation[]> => {
  const result = await pool.query(`
    SELECT * FROM reservation WHERE house_id = '${houseId}';
  `);
  const allReservations = result.rows.map((item) => {
    return parseReservationFromDb(item);
  });
  return allReservations;
};

const getShortagesWithHouseId = async (
  houseId: string
): Promise<Shortage[]> => {
  const result = await pool.query(`
  SELECT * FROM shortage WHERE house_id = '${houseId}';
  `);
  const shortages = result.rows.map((item) => {
    return parseShortageFromDb(item);
  });
  return shortages;
};

const addNewShortageToDb = async ({
  id,
  userWhoAddedId,
  houseId,
  content,
  isResolved,
  timestamp,
}: Shortage): Promise<void> => {
  await pool.query(`
  INSERT INTO shortage VALUES (
    '${id}',
    '${userWhoAddedId}',
    '${houseId}',
    '${content}',
    '${isResolved}',
    '${timestamp}'
  );
  `);
};

const resolveShortage = async (obj: Shortage): Promise<void> => {
  await pool.query(`
  UPDATE shortage SET resolved = '${obj.isResolved}' WHERE shortage_id = '${obj.id}';
  `);
};

const getMessagesForHouseIdFromDb = async (
  houseId: string
): Promise<Message[]> => {
  const result = await pool.query(`
    SELECT * FROM message WHERE house_id='${houseId}';
  `);
  const results = result.rows.map((item) => {
    return parseMessageFromDb(item);
  });
  return results;
};

const getMessagesWithRepliesForHouseIdFromDb = async (
  houseId: string
  // ): Promise<MessageWithReplies[] | []> => {
): Promise<void> => {
  const messageResult = await pool.query(`
    SELECT * FROM message WHERE house_id='${houseId}';
  `);
  const messages = messageResult.rows.map((message) => {
    return parseMessageFromDb(message);
  });

  console.log('this is messages', messages);

  const messagesWithReplies = messages.map((message) => {
    // const replies = await getRepliesForMessage(message.id);
    const asd = getRepliesForMessage(message.id)
      .then((result) => {
        return result;
      })
      .catch((err) => console.log(err));
    // console.log('this is replies:', replies);
    return asd;
  });

  console.log('this is messagesWithReplies', messagesWithReplies);

  // const messagesWithReply = messages.map(async (message) => {
  //   const repliesResult = await getRepliesForMessage(message.id);
  //   if (repliesResult.length === 0) {
  //     return [];
  //   }
  //   const replies = repliesResult.map((reply) => {
  //     return parseReplyFromDb(reply);
  //   });
  //   // const replies = parseReplyFromDb(repliesResult); // get replies returns list but parse reply returns one reply
  //   const toReturn = {
  //     ...message,
  //     replies,
  //   };

  //   return parseMessageWithRepliesFromDb(toReturn);
  // });

  // console.log('this is messages with reply', messagesWithReply);

  // return messagesWithReply;
};

const addNewMessageToDb = async ({
  id,
  userWhoAddedId,
  houseId,
  content,
  timestamp,
}: Message): Promise<void> => {
  await pool.query(`
  INSERT INTO message VALUES (
    '${id}',
    '${userWhoAddedId}',
    '${houseId}',
    '${content}',
    '${timestamp}'
  );
  `);
};

const addNewReplyToDb = async ({
  id,
  userWhoAddedId,
  content,
  timestamp,
  originalMessageId,
}: MessageReply): Promise<void> => {
  await pool.query(`
    INSERT INTO message_reply VALUES (
      '${id}',
      '${userWhoAddedId}',
      '${originalMessageId}',
      '${content}',
      '${timestamp}'
    );
  `);
};

const getRepliesForMessage = async (
  messageId: string
): Promise<MessageReply[] | []> => {
  const result = await pool.query(`
  SELECT * FROM message_reply WHERE reply_to_id = '${messageId}';
  `);
  if (result.rows.length === 0) {
    return [];
  }
  const results = result.rows.map((item) => {
    return parseReplyFromDb(item);
  });
  return results;
};

export default {
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
  resolveShortage,
  getMessagesWithRepliesForHouseIdFromDb,
};
