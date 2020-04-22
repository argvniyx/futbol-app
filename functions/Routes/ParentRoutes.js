const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

const authenticated = require('../Middlewares/Authenticated');

// ---------------------------------------------------------
router.post('/sign-up', (req, res) => {

    Email = req.body.Email;
    Password = req.body.Password;
    FirstName = req.body.FirstName;
    LastName = req.body.LastName;
    TypeUser = 3;

    if (
        !Email ||
        !Password ||
        !FirstName ||
        !LastName
    ) {
        return res.status(400).send('Missing body');
    }

    // Hay que agregar que se cree el objeto User en la tabla User (La nuestra)
    // para agregar el dato de TypeUser

    admin.auth().createUser({
        email: Email,
        password: Password,
        displayName: FirstName + ' ' + LastName
    }).then((user) => {
        return res.status(200).json(user);
    }).catch((error) => {
        return res.status(500).json(error.message);
    });

});
// Just testing middle ware
// ---------------------------------------------------------
router.get('/hello', authenticated, (req, res) => {
    return res.status(200).send('hello world');
});

module.exports = router;
