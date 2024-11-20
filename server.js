const express = require('express');
const path = require('path');
const cors = require('cors');
const sequelize = require('./db');
const uploadRoutes = require('./routes/uploadRoutes'); // Import the routes
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON requests
app.use(express.urlencoded({ extended: true })); // For parsing form data

// Use the routes from routes.js
app.use('/api', uploadRoutes);

// Sync the models with the database
sequelize.sync({ force: false }) // Set to `true` to drop tables on sync (use cautiously)
    .then(() => {
        console.log('Database synced successfully!');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
