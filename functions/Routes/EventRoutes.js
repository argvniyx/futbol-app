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
    const coachID = req.user_id;

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

    // get the coach team
    firestore.collection(
        'users'
    ).doc(coachID).get().then((doc) => {
        const coachTeam = doc.data().TeamID;

        // get the team of the event
        firestore.collection(
            'events'
        ).doc(eventID).get().then((docEvent) => {
            const eventTeam = docEvent.data().TeamID;

            if (
                // verified the coach is owner of the event the team belongs to
                coachTeam === eventTeam
            ) {

                // update
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

            } else {
                return res.status(400).send("You are not owner of that team");
            }

        }).catch((error) => {
            return res.status(500).send(error.message);
        });

    }).catch((error) => {
        return res.status(500).send(error.message);
    });

});

// TODO: Here the get for events related to my team

// ---------------------------------------------------------
router.delete('/:id',
    authenticated,
    isCoach,
    (req, res) => {

    const firestore = admin.firestore();
    const coachID = req.user_id;
    const eventID = req.params.id;

    firestore.collection(
        'users'
    ).doc(coachID).get().then((doc) => {
        const coachTeam = doc.data().TeamID;

        firestore.collection(
            'events'
        ).doc(eventID).get().then((docEvent) => {
            const eventTeam = docEvent.data().TeamID;

            if(coachTeam === eventTeam) {

                firestore.collection(
                    'teams'
                ).doc(eventTeam).update({
                    Events: admin.firestore.FieldValue.arrayRemove(eventID)
                }).then(() => {

                    firestore.collection(
                        'events'
                    ).doc(eventID).delete().then(() => {
                        return res.status(200).send('Event deleted successfully');
                    }).catch((error) => {
                        return res.status(500).send(error.message);
                    });

                }).catch((error) => {
                    return res.status(500).send(error.message);
                });

            } else {
                return res.status(400).send("You are not owner of that team");
            }

        }).catch((error) => {
            return res.status(500).send(error.message);
        });

    }).catch((error) => {
        return res.status(500).send(error.message);
    });
});

module.exports = router;
