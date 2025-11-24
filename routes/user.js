const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/user');

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

router.post('/register', register)
router.post('/login', login)

module.exports = router;