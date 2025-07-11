const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');

router.post('/create', bookingController.createBooking);

module.exports = router;

const {
  getAllBookings,
  getBookingById,
  deleteBookingById
} = require('../controllers/bookingController');
  
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.delete('/:id', deleteBookingById);

module.exports = router;
