const express = require('express');
const admin = require('firebase-admin');

// Routes app
const router = express.Router();

// Load the middlewares
const authenticated = require('../Middlewares/authenticated');
const isAdmin = require('../Middlewares/isAdmin.js');

// ---------------------------------------------------------
router.post('/new-team', authenticated, isAdmin, (req, res) => {
    console.log("HEREEEEEEEEEEEEEEEEEEEEEEE")
    // Get the request body 
    const Name = req.body.Name;
    const ColorFont = req.body.ColorFont;
    const ColorBackground = req.body.ColorBackground;
    const SeasonStart = req.body.SeasonStart;
    const SeasonEnd = req.body.SeasonEnd;

    // Check that the request has the complete body
    if (!Name ||
        !ColorFont ||
        !ColorBackground ||
        !SeasonStart ||
        !SeasonEnd) {

        return res.status(400).send('Missing body');
    }

    // Add team object to the collection
    admin.firestore().collection('teams').add({
        Name: Name,
        ColorFont: ColorFont,
        ColorBackground: ColorBackground,
        SeasonStart: SeasonStart,
        SeasonEnd: SeasonEnd,
        Events: []
    })

    // Return the success code and message
    .then(() => {
        return res.status(200).send('Team created successfully');
    })
    // Return the error code and message
    .catch((error) => {
        return res.status(500).json(error.message);
    });
});


module.exports = router;