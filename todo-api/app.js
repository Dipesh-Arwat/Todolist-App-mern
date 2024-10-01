const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();


// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

app.use('/api/auth', authRoutes);
// To-Do Routes
app.use('/api/todos', todoRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
