const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create-with-profile', userController.createUserWithProfile);
router.post('/:id/posts', userController.createPostForUser);
router.get('/:id/bookings', userController.getUserBookings);

module.exports = router;

const {
  registerUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
} = require('../controllers/userController');

// Register a new user
router.post('/register', registerUser);

// 🔥 New: Fetch all users
router.get('/', getAllUsers);
router.get('/:id', getUserById); // 🔥 This line enables /users/:id
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);



module.exports = router;
