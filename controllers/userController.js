const db = require('../models/db');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// One-to-One
exports.createUserWithProfile = async (req, res) => {
  const { email, bio } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        email,
        profile: {
          create: { bio }
        }
      },
      include: { profile: true }
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// One-to-Many (User → Post)
exports.createPostForUser = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        user: { connect: { id: parseInt(id) } }
      }
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Bookings by User (Many-to-Many)
exports.getUserBookings = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        bookings: {
          include: { freelancer: true }
        }
      }
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.registerUser = (req, res) => {
  const { name, email, role } = req.body;
  const sql = 'INSERT INTO users (name, email, role) VALUES (?, ?, ?)';

  db.query(sql, [name, email, role], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  });
};
exports.getAllUsers = (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching users:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
};
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('❌ Error fetching user:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(results[0]);
  });
};
exports.updateUserById = (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  const sql = 'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?';

  db.query(sql, [name, email, role, id], (err, result) => {
    if (err) {
      console.error('❌ Error updating user:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  });
};
exports.deleteUserById = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('❌ Error deleting user:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  });
};

 