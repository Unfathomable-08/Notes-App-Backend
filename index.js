const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

// .env
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const notesRouter = require('./routes/notes');
const userRouter = require('./routes/user');
app.use('/api/notes', notesRouter);
app.use('/api/user', userRouter);

// Server
app.listen(8080, () => {
  console.log('Server is running on port 8080');
})