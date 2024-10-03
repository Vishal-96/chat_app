import 'dotenv/config';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { join } from 'path';
import passport from 'passport';
import cors from 'cors';
const { Server } = require('socket.io');
import routes from './routes';
import { seedDb } from './utils/seed';

const app = express();
//cors setup
app.use(cors());

//web socket setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);

    //todo check room id and save messsages
  });

  socket.on('typing',(user)=>{
    if(user && user.name)
      socket.broadcast.emit(`${user.name} is typing`);
    else  
      socket.broadcast.emit('Someone is tying');
  })

  socket.on('stopTyping',()=>{
    socket.broadcast.emit('stopTyping');
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//passport setup
app.use(passport.initialize());
require('./services/jwtStrategy');
require('./services/localStrategy');

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
    seedDb(); //once users seeded turn off else it will remove existing users
  })
  .catch((err) => console.log(err));

// Use Routes
app.use('/', routes);

const port = 5000;
console.log(join(__dirname, '../public/images'));
server.listen(port, () => console.log(`Server started on port ${port}`));
