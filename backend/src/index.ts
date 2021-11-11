import express, { json, NextFunction, Request, Response } from 'express';
import userRouter from './routers/user';
import houseRouter from './routers/house';
import loginRouter from './routers/login';
import reservationRouter from './routers/reservation';
import shortageRouter from './routers/shortage';
import messageRouter from './routers/message';
import cookieParser from 'cookie-parser';
import config from './config';
import {
  errorLogger,
  errorResponder,
  generalError,
  unknownEndpoint,
} from './middleware/errorHandlers';
import jwtHelper from './utils/jwtHelper';
import cors from 'cors';
// import databaseHelper from './database/databaseHelper'; // Uncomment if need to seed database

const app = express();
const port = process.env.PORT || config.port;

// databaseHelper.seedDataBase(); // Uncomment if need to seed database

app.use(cors());
app.use(json());
app.use(cookieParser());

app.use('/api/ping', (_req, res, _next) => {
  res.status(200).json({
    message: 'Pong',
  });
});

app.use('/api/login', loginRouter);

// Middleware to check the user is logged in
// Could it be possible to pass around the user info to every router via this function?
app.use((req: Request, _res: Response, next: NextFunction) => {
  jwtHelper.decodeUser(req.cookies.token);
  next();
});

app.use('/api/users', userRouter);
app.use('/api/houses', houseRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/shortages', shortageRouter);
app.use('/api/messages', messageRouter);

// Error handlers
app.use(errorLogger);
app.use(errorResponder);
app.use(generalError);
app.use(unknownEndpoint);

app.listen(port, () => {
  console.log('listening to port', 3001);
});
