import express, { json } from 'express';
import dotenv from 'dotenv';
import userRouter from './routers/user';
import houseRouter from './routers/house';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(json());
app.use('/api/users', userRouter);
app.use('/api/houses', houseRouter);

app.listen(port, () => {
  console.log('listening to port', port);
});
