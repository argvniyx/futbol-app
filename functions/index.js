const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// App Settings
const app = express();
app.use(bodyParser.json());

app.use(cors({ origin: true }));

app.get('/hello-world', (req, res) => {
    return res.status(200).send('Hello World!');
});

exports.app = functions.https.onRequest(app);
