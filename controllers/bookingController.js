const db = require('../models/db');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createBooking = async (req, res) => {
  const { userId, freelancerId, status } = req.body;

  // ✅ Validate presence
  if (!userId || !freelancerId || !status) {
    return res.status(400).json({
      error: "❌ userId, freelancerId, and status are required"
    });
  }

  try {
    const booking = await prisma.booking.create({
      data: {
        user: { connect: { id: Number(userId) } },
        freelancer: { connect: { id: Number(freelancerId) } },
        status
      }
    });
    res.status(201).json({
      message: "✅ Booking created",
      data: booking
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Get All Bookings
exports.getAllBookings = (req, res) => {
  const sql = 'SELECT * FROM booking';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching bookings:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
};

// 3. Get Booking by ID
exports.getBookingById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM booking WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('❌ Error fetching booking:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(results[0]);
  });
};

// 4. Delete Booking by ID
exports.deleteBookingById = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM booking WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('❌ Error deleting booking:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  });
};
