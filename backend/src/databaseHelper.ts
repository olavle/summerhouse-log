import { Pool, Client } from 'pg';
import config from './config';
import { User } from './types';

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

const client = new Client({
  user,
  host,
  database,
  password,
  port,
});

// client.connect().catch(err => console.log('error with database connection:', err));

const testDbConnection = (): void => {
  pool.query('SELECT NOW()', (err, res) => {
    console.log(
      `pool.query in action with user: ${user}, host: ${host}, database: ${database}`
    );
    console.log('err:', err, 'res:', res);
    pool.end().catch((err) => console.log(err));
  });

  client.connect().catch((err) => console.log(err));
  client.query('SELECT NOW()', (err, res) => {
    console.log(
      `client.query in action with user: ${user}, host: ${host}, database: ${database}`
    );
    console.log('err:', err, 'res:', res);
    client.end().catch((err) => console.log(err));
  });
};

const tableCreationText = `CREATE TABLE IF NOT EXISTS app_user (
  id varchar(40) NOT NULL UNIQUE,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  username varchar(50) NOT NULL,
  passwordHash varchar(50) NOT NULL,
  email varchar(50),
  PRIMARY KEY ("id")
);`;

// const userInsertText = `INSERT INTO app_user VALUES (
//   'veryunique',
//   'John',
//   'Doe',
//   'johns user',
//   'secretpasswordyes'
// );`;

// Only does the user for now
// TODO: Make db table creation string ready to a serperate file
const seedDataBase = (): void => {
  client
    .connect()
    .then(() => console.log('succesfully connected!'))
    .catch((err) => console.log('error with connecting to client:', err));
  client.query(tableCreationText, (err, _res) => {
    if (err) throw err;
    console.log('Created database!');
    client.end().catch((err) => console.log(err));
  });
  // client
  //   .connect()
  //   .then(() => console.log('Made connection'))
  //   .catch((err) => console.log(err));
  // client.query(userInsertText, (err, res) => {
  //   if (err) throw err;
  //   console.log('res:', res);
  //   console.log('insert into db done!');
  //   client.end().catch((err) => console.log(err));
  // });
};

// const addUserToDb = ({
//   id,
//   fname,
//   lname,
//   username,
//   password,
//   email,
// }: User): void => {
//   client.connect().catch((err) => {
//     throw err;
//   });
//   client.query(
//     `INSERT INTO app_user VALUES (
//     '${id}',
//     '${fname}',
//     '${lname}',
//     '${username}',
//     '${password}',
//     '${email}'
//   );`,
//     (err, res) => {
//       if (err) throw err;
//       console.log(res);
//       client.end().catch(err => console.log(err));
//     }
//   );
// };

const addUserToDb = ({
  id,
  fname,
  lname,
  username,
  password,
  email,
  linkedHouses,
  housesUserAdmins,
}: User): void => {
  try {
    client.query(
      `INSERT INTO app_user VALUES (
      '${id}',
      '${fname}',
      '${lname}',
      '${username}',
      '${password}',
      '${email}',
      '${linkedHouses}',
      '${housesUserAdmins}',
    );`,
      (err, res) => {
        if (err) throw err;
        console.log('res from addusertodb', res);
      }
    );
  } catch (error) {
    console.log('error from addusertodb:', error);
  }
};

export default {
  testDbConnection,
  seedDataBase,
  addUserToDb,
};
