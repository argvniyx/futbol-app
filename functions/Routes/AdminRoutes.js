const express = require('express');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

// Routes app
const router = express.Router();

// Load the middlewares
const authenticated = require('../Middlewares/authenticated');
const isAdmin = require('../Middlewares/isAdmin.js');

// Set the api key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ---------------------------------------------------------
router.post('/new-coach', authenticated, isAdmin, (req, res) => {

    // Get the request body 
    const Email = req.body.Email;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;

    // Built the register coach url
    const URL_form = req.protocol + '://' + req.get("host") + '/coach/Sign-Up';

    // Check that the request has the complete body
    if (!Email ||
        !FirstName ||
        !LastName) {
        return res.status(400).send('Missing body');
    }

    // Create the message
    const msg = {
        to: Email,
        from: process.env.FROM_EMAIL,
        subject: '¡Registrate como Entrenador!',

        // Custom template
        templateId: process.env.ID_NEWCOACH_TEMPLATE,
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
        return res.status(500).send('Error sending email');
    })
});


module.exports = router;
