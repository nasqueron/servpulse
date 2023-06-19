//     -------------------------------------------------------------
//     ServPulse :: app
//     - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//     Project:        Nasqueron
//     Description:    Bootstrap the application
//     License:        BSD-2-Clause
//     -------------------------------------------------------------

require('dotenv').config(); // Set up .env file
require('./config/database.js'); // Set up database connection

const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Import routes
const serviceRoutes = require('./routes/serviceRoutes.js');
const incidentRoutes = require('./routes/incidentRoutes.js');
const configRoutes = require('./routes/configRoutes.js');

// Use the routes
app.use('/api', serviceRoutes);
app.use('/api', incidentRoutes);
app.use('/api', configRoutes);

// Start the server
const PORT = process.env.EXPRESS_PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
