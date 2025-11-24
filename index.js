const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

// .env
dotenv.config();

// Middlewares
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options('*', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res.status(200).end();
});
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

module.exports = app