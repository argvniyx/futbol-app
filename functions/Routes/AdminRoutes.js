const express = require('express');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');

// Routes app
const router = express.Router();

// Load the middlewares
const authenticated = require('../Middlewares/authenticated');
const isAdmin = require('../Middlewares/isAdmin.js');

// Set the api key
sgMail.setApiKey(functions.config().futbol.sendgrid_api_key);

// ---------------------------------------------------------
router.post('/new-coach', authenticated, isAdmin, (req, res) => {

    // Get the request body
    const Email = req.body.Email;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;

    // Built the register coach url
    const URL_form = 'https://futbol-app.now.sh/register-coach';

    // Check that the request has the complete body
    if (!Email ||
        !FirstName ||
        !LastName) {
        return res.status(400).send('Missing body');
    }

    // Create the message
    const msg = {
        to: Email,
        from: functions.config().futbol.from_email,
        subject: '¡Registrate como Entrenador!',

        // Custom template
        templateId: functions.config().futbol.id_newcoach_template,
        substitutionWrappers: ['{{', '}}'],
        dynamic_template_data: {
            name: FirstName + ' ' + LastName,
            subject: '¡Registrate como Entrenador!',
            URL: URL_form
        }
    }

    // Send the email
    sgMail.send(msg).then(() => {
        return res.status(200).send('Email sent!');
    }).catch((error) => {
        return res.status(500).send(error.message);
    })
});


module.exports = router;
