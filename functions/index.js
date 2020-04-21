const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// App Settings
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));

// import firebase admin settings
const serviceAccount = require("./futbol-app-8b521-firebase-adminsdk-e1qpn-cf3587676f.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://futbol-app-8b521.firebaseio.com"
});

// Import Routes
const parentRoutes = require('./Routes/ParentRoutes');

// Routes for Request
app.use('/parent', parentRoutes);

exports.app = functions.https.onRequest(app);
