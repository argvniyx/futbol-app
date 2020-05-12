const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

const authenticated = require('../Middlewares/authenticated');
const isCoach = require('../Middlewares/isCoach');

// ---------------------------------------------------------
router.post('/',
    authenticated,
    isCoach,
    (req, res) => {

    const firestore = admin.firestore();
    const Name = req.body.Name;
    const Place = req.body.Place;
    let dDate = req.body.Date;
    const Duration = req.body.timeDuration;
    const TeamID = req.body.TeamID;
    const Description = req.body.Description;

    if (
        !Name ||
        !Place ||
        !dDate ||
        !Duration ||
        !TeamID
    ) {
        return res.status(404).send('Missing Params');
    } else {
        dDate = new Date(dDate);
    }

    firestore.collection('events').add({
        Name: Name,
        Place: Place,
        Date: dDate,
        Duration: Duration,
        TeamID: TeamID,
        Description: Description
    }).then((docRef) => {
        const newEventID = docRef.id;

        firestore.collection(
            'teams'
        ).doc(TeamID).update({
            Events: admin.firestore.FieldValue.arrayUnion(newEventID)
        }).then(() => {
            return res.status(200).send('Event created successfully');
        }).catch((error) => {
            return res.status(500).send(error.message);
        });

    }).catch((error) => {
        return res.status(500).send(error.message);
    });

});

// ---------------------------------------------------------
router.put('/:id',
    authenticated,
    isCoach,
    (req, res) => {

    const firestore = admin.firestore();
    const Name = req.body.Name;
    const Place = req.body.Place;
    let dDate = req.body.Date;
    const Duration = req.body.timeDuration;
    const Description = req.body.Description;
    const eventID = req.params.id;

    if (
        !Name ||
        !Place ||
        !dDate ||
        !Duration
    ) {
        return res.status(404).send('Missing Params');
    } else {
        dDate = new Date(dDate);
    }

    firestore.collection(
        'events'
    ).doc(eventID).update({
        Name: Name,
        Place: Place,
        Date: dDate,
        Duration: Duration,
        Description: Description
    }).then(() => {
        return res.status(200).send('Event updated successfully');
    }).catch((error) => {
        return res.status(500).send(error.message);
    });

});

module.exports = router;
