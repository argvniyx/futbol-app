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
        const { UserType, TeamID  } =  doc.data();
        return res.status(200).json({
            "Role": UserType,
            "TeamID": TeamID
        });
    }).catch((error) => {
        return res.status(500).send(error.message);
    });
});

module.exports = router;
