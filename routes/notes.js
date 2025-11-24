const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth')

const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/notes');

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

router.get('/', protect, getNotes)
router.post('/', protect, createNote)
router.put('/:id', protect, updateNote)
router.delete('/:id', protect, deleteNote)

module.exports = router;