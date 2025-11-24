const Note = require('../models/notes');
const connectDB = require('../lib/db')

require('dotenv').config();

// GET ALL NOTES (for authenticated user only)
const getNotes = async (req, res) => {
  try {
    await connectDB()
    
    // req.user is set by auth middleware
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Failed to fetch notes',
    });
  }
};

// CREATE A NEW NOTE
const createNote = async (req, res) => {
  await connectDB()
  
  const { title, content } = req.body;

  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Title and content are required',
    });
  }

  try {
    const note = await Note.create({
      title: title.trim(),
      content: content.trim(),
      userId: req.user.id, // Always use authenticated user's ID
    });

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note,
    });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create note',
      error: error.message,
    });
  }
};

// UPDATE A NOTE (only if it belongs to the user)
const updateNote = async (req, res) => {
  await connectDB()
  
  const { id } = req.params;
  const updates = req.body;

  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No update data provided',
    });
  }

  try {
    // Find note and ensure it belongs to the authenticated user
    const note = await Note.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updates,
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found or you do not have permission to update it',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: note,
    });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update note',
      error: error.message,
    });
  }
};

// DELETE A NOTE (only if it belongs to the user)
const deleteNote = async (req, res) => {
  await connectDB()
  
  const { id } = req.params;

  try {
    const note = await Note.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found or you do not have permission to delete it',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      data: {},
    });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete note',
      error: error.message,
    });
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};