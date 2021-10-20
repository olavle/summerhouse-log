import express, { json } from 'express';
import userRouter from './routers/user';
import houseRouter from './routers/house';
import loginRouter from './routers/login';
import cookieParser from 'cookie-parser';
import config from './config';
import { errorLogger, errorResponder, generalError, unknownEndpoint } from './middleware/errorHandlers';
// import databaseHelper from './database/databaseHelper'; // Uncomment if need to seed database

const app = express();
const port = config.port;

// databaseHelper.seedDataBase(); // Uncomment if need to seed database

app.use(json());
app.use(cookieParser());
app.use('/api/users', userRouter);
app.use('/api/houses', houseRouter);
app.use('/api/login', loginRouter);

// Error handlers
app.use(errorLogger);
app.use(errorResponder);
app.use(generalError);
app.use(unknownEndpoint);

app.listen(port, () => {
  console.log('listening to port', 3001);
});
