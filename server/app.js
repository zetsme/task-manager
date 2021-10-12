import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';

import tasksRouter from './routes/tasks.js';
import CustomError from './customError.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello'));
app.use('/api/v1/tasks', tasksRouter);
app.use((req, res) => {
  throw new CustomError(404, 'Route does not exist');
});
app.use(errorHandler);

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => console.log(`app is listening port ${port}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
