const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

// Route imports
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Use routes
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/bookings', bookingRoutes);

app.use('/posts', require('./routes/postRoutes'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
