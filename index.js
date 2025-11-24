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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send("hello!")
})

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