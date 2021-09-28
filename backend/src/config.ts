import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  db: {
    user: process.env.POSTGRESQL_USER,
    host: process.env.POSTGRESQL_HOST,
    db: process.env.POSTGRESQL_DB,
    pw: process.env.POSTGRESQL_PW,
    port: process.env.POSTGRESQL_PORT,
  },
};
