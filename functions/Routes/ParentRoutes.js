const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

const authenticated = require('../Middlewares/Authenticated');

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
        ).doc(user.email).set({
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
// Just testing middleware
// ---------------------------------------------------------
router.get('/hello', authenticated, (req, res) => {
    // this is the get for all
    admin.firestore().collection(
        'users'
    ).get().then((snapshot) => {
        let users = snapshot.docs.map(doc => {
            return doc.data();
        });
        return res.status(200).json(users);
    }).catch((error) => {
        return res.status(500).json(error.message);
    });
});

module.exports = router;
