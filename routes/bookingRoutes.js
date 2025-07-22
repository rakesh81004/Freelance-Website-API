const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // 🔐 Import middleware
const {
  createBooking,
  getAllBookings,
  getBookingById,
  deleteBookingById
} = require('../controllers/bookingController');

// 📝 Create a new booking (protected)
router.post('/create', auth, createBooking);

// 📥 Get all bookings (protected)
router.get('/', auth, getAllBookings);

// 🔍 Get a booking by ID (protected)
router.get('/:id', auth, getBookingById);

// ❌ Delete booking by ID (protected)
router.delete('/:id', auth, deleteBookingById);

module.exports = router;
