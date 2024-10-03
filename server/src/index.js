import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { resolve, join } from 'path';
import passport from 'passport';
import cors from 'cors';
import routes from './routes';
import { seedDb } from './utils/seed';

const app = express();
//cors setup
app.use(cors());

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//passport setup
app.use(passport.initialize());
require('./services/jwtStrategy');
require('./services/localStrategy');

const isProduction = process.env.NODE_ENV === 'production';

// DB Config
const dbConnection = process.env.MONGO_URI;

// Connect to Mongodb
mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB Connected...');
    // seedDb(); //once users seeded turn off else it will remove existing users
  })
  .catch((err) => console.log(err));

// Use Routes
app.use('/', routes);

const port = 5000;
console.log(join(__dirname, '../public/images'));
app.listen(port, () => console.log(`Server started on port ${port}`));
