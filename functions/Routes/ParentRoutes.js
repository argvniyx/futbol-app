const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

const authenticated = require('../Middlewares/Authenticated');
const isParent = require('../Middlewares/isParent');

// ---------------------------------------------------------
router.post('/sign-up', (req, res) => {

    const Email = req.body.Email;
    const Password = req.body.Password;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Phone = req.body.Phone;
    const TypeUser = 3; // this means is a parent

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
        displayName: FirstName + ' ' + LastName,
        phoneNumber: Phone
    }).then((user) => {

        // add to our user table
        admin.firestore().collection(
            'users'
        ).doc(user.uid).set({
            uid: user.uid,
            TypeUser: TypeUser
        }).then(() => {
            return res.status(200).send(
                'User created successfully'
            );
        }).catch((error) => {
            return res.status(500).json(error.message);
        });
    }).catch((error) => {
        return res.status(500).json(error.message);
    });

});

// TODO: Here everything but the children methods

// Children routes
// ---------------------------------------------------------
router.post(
    '/children',
    authenticated,
    isParent,
    (req, res) => {
        return res.status(200).send('good');
    });

module.exports = router;
