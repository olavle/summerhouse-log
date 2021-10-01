import express, { json } from 'express';
import userRouter from './routers/user';
import houseRouter from './routers/house';
import databaseHelper from '../databse/databaseHelper';
import config from './config';

const app = express();
const port = config.port;

databaseHelper.seedDataBase();

app.use(json());
app.use('/api/users', userRouter);
app.use('/api/houses', houseRouter);

app.listen(port, () => {
  console.log('listening to port', port);
});
