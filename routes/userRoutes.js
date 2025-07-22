const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  registerUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createUserWithProfile,
  createPostForUser,
  getUserBookings
} = require('../controllers/userController');

// ✅ Public Route: Register a new user
router.post('/register', registerUser);

// ✅ Protected Routes (Require Token)
router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUserById);
router.put('/:id', auth, updateUserById);
router.delete('/:id', auth, deleteUserById);

// ✅ Nested Functional Routes
router.post('/create-with-profile', auth, createUserWithProfile);
router.post('/:id/posts', auth, createPostForUser);
router.get('/:id/bookings', auth, getUserBookings);

module.exports = router;
