const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// App Settings
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));

// Set the enviroment variables file
dotenv.config();

// Import firebase admin settings
const serviceAccount = require("./futbol-app-8b521-firebase-adminsdk-e1qpn-cf3587676f.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://futbol-app-8b521.firebaseio.com"
});

// Import Routes
const adminRoutes = require('./Routes/AdminRoutes');
const coachRoutes = require('./Routes/CoachRoutes');
const parentRoutes = require('./Routes/ParentRoutes');
const teamsRoutes = require('./Routes/TeamsRoutes');

// Routes for Request
app.use('/admin', adminRoutes);
app.use('/coach', coachRoutes);
app.use('/parent', parentRoutes);
app.use('/teams', teamsRoutes);

// Export the app
exports.app = functions.https.onRequest(app);
