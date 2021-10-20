import { Pool } from 'pg';
import config from '../config';
import { House, User } from '../types';
import { parseUserFromDb } from '../utils/dataParsers';
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

export default {
  seedDataBase,
  addUserToDb,
  // getAllUsersWithHouses,
  getAllUsers,
  getUserByUsername,
  addHouseToDb,
};
