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
    const Description = req.body.Description ? req.body.Description : ' ';

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

// ---------------------------------------------------------
router.get('/:id/', authenticated, (req, res) => {

    const firestore = admin.firestore();
    const teamId = req.params.id;
    const intPage = req.query.Page;
    const intNumberToBring = req.query.NumberToBring;
    let arrEventsId = [];
    let intMaxPages;
    let bStart;
    let bEnd;

    if (
        !intPage || !intNumberToBring
    ) {
        return res.status(404).send('missing query params');
    }

    firestore.collection(
        'teams'
    ).doc(teamId).get().then((doc) => {
        if(
            //makes sure that the team exists
            !doc.data()
        ) {
           return res.status(404).send('No team found with that id');
        } else {
            arrEventsId = doc.data().Events ?  doc.data().Events : [];
        }

        if(
            // if there are no items in the array
            arrEventsId.length === 0
        ) {
            bStart = true;
            bEnd = true;
            return res.status(200).json({
                'Events': arrEventsId,
                'Page': 1,
                'Start': bStart,
                'End': bEnd
            });
        } else {

            // check the max number of pages
            intMaxPages = arrEventsId.length / Math.abs(intNumberToBring);
            intMaxPages = intMaxPages % 1 > 0 ? Math.floor(intMaxPages)+1 : Math.floor(intMaxPages);

            if(
                // verified the page we are at is part of our range of pages
                intPage <= 0 ||
                intPage > intMaxPages
            ) {
                return res.status(400).send('Number of page is out of range');
            }

            if(
                // tells if we are at the beginning or at the end of times
                parseInt(intPage) === intMaxPages &&
                intMaxPages === 1
            ) {
                bStart = true;
                bEnd = true;
            } else if(parseInt(intPage) === 1){
                bStart = true;
                bEnd = false;
            } else if(
                parseInt(intPage) === intMaxPages &&
                intMaxPages !== 1
            ) {
                bStart = false;
                bEnd = true;
            } else {
                bStart = false;
                bEnd = false;
            }

            const intPosStart = (intPage - 1) * intNumberToBring;
            let arrAllEvents = [];
            // get the information of all events
            arrEventsId.forEach((eventid) => {

                firestore.collection(
                    'events'
                ).doc(eventid).get().then((doc) => {

                    let event = doc.data();
                    event.id = eventid;
                    arrAllEvents.push(event);

                    if(
                        arrAllEvents.length === arrEventsId.length
                    ) {
                        // sort by dates
                        arrAllEvents = arrAllEvents.sort((a, b) => {
                            return a.Date>b.Date ? -1 : a.Date<b.Date ? 1 : 0;
                        });

                        // splices the ones we want
                        let arrEventsToSend = [];
                        arrEventsToSend = arrAllEvents.splice(intPosStart, parseInt(intNumberToBring));
                        return res.status(200).json({
                            'Events': arrEventsToSend,
                            'Page': intPage,
                            'Start': bStart,
                            'End': bEnd
                        });
                    }

                }).catch((error) => {
                    return res.status(500).send(error.message);
                });

            });
        }
    }).catch((error) => {
        return res.status(500).send(error.message);
    })
});

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
