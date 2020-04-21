const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

const authenticated = require('../Middlewares/authenticated');

// ---------------------------------------------------------
router.post('/sing-up', (req, res) => {

    Email = req.body.Email;
    Password = req.body.Password;
    FirstName = req.body.FirstName;
    LastName = req.body.LastName;

    if (
        !Email ||
        !Password ||
        !FirstName ||
        !LastName
    ) {
        return res.status(400).send('Missing body');
    }
    admin.auth().createUser({
        email: Email,
        password: Password,
        displayName: FirstName + ' ' + LastName
    }).then((user) => {
        return res.status(200).json(user);
    }).catch((error) => {
        return res.status(500).json(error);
    });
});
// Just testing middle ware
// ---------------------------------------------------------
router.get('/', authenticated, (req, res) => {
    return res.status(200).send('hello world');
});

module.exports = router;
