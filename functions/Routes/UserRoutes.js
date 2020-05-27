const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

const authenticated = require('../Middlewares/authenticated');

// ---------------------------------------------------------
router.get('/fillOtherUserParams', authenticated, (req, res) => {
    const firestore = admin.firestore();
    const userID = req.user_id;

    firestore.collection(
        'users'
    ).doc(userID).get().then((doc) => {
        if(doc) {
            const { UserType, TeamID  } =  doc.data();
            return res.status(200).json({
                "Role": UserType,
                "TeamID": TeamID
            });
        } else {
            return res.status(404).send('it seems you are missing');
        }
    }).catch((error) => {
        return res.status(500).send(error.message);
    });
});

module.exports = router;
