const express = require('express');
const path = require('path');
const cors = require('cors');
const sequelize = require('./db');
const uploadRoutes = require('./routes/uploadRoutes'); // Import the routes

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON requests
app.use(express.urlencoded({ extended: true })); // For parsing form data

// Use the routes from routes.js
app.use('/api', uploadRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
