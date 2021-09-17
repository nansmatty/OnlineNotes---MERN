const express = require('express');
const {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getNotes);
router
  .route('/:id')
  .get(getNoteById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);
router.route('/create').post(protect, createNote);

module.exports = router;
