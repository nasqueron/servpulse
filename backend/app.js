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
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const serviceRoutes = require('./routes/serviceRoutes.js');
const incidentRoutes = require('./routes/incidentRoutes.js');
const configRoutes = require('./routes/configRoutes.js');
const maintenanceRoutes = require('./routes/maintenanceRoutes.js');

// Use the routes
app.use('/api', serviceRoutes);
app.use('/api', incidentRoutes);
app.use('/api', configRoutes);
app.use('/api', maintenanceRoutes);

// Start the server
const PORT = process.env.EXPRESS_PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
