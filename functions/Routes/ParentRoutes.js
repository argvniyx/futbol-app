const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

const authenticated = require('../Middlewares/Authenticated');
const isParent = require('../Middlewares/isParent');

// ---------------------------------------------------------
router.post('/sign-up', (req, res) => {

    const Email     = req.body.Email;
    const Password  = req.body.Password;
    const FirstName = req.body.FirstName;
    const LastName  = req.body.LastName;
    const Phone     = req.body.Phone;
    const UserType  = 3; // this means is a parent

    if (
        // just to check this params are included
        !Email     ||
        !Password  ||
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
            UserType: UserType,
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

// TODO: Other parent methods

// Children routes
// ---------------------------------------------------------
router.post(
    '/children',
    authenticated,
    isParent,
    (req, res) => {

        const firestore    = admin.firestore();
        const userID       = req.user_id;
        let arrChildren    = []; // to store incoming children
        let arrRefChildren = []; // store their reference
        arrChildren        = req.body.children;

        if  (
            // just checks the params are included
            !arrChildren ||
            arrChildren.length === 0
        ) {
            return res.status(400).send('missing children to add');
        } else {

            arrChildren.forEach((child) => {
                // add every child to the children table
                firestore.collection('children').add({
                    FirstName: child.FirstName,
                    LastName: child.LastName,
                    TeamNumber: child.TeamNumber,
                    Absence: 0
                }).then((docRef) => {

                    arrRefChildren.push(docRef.id);
                    // add every children id to the parent
                    firestore.collection(
                        'users'
                    ).doc(userID).update({
                        // this helps us add our children if it has data in the array
                        children: admin.firestore.FieldValue.arrayUnion(docRef.id)
                    }).catch((error) => {
                        return res.status(500).send(error.message);
                    });

                    if (
                        // just checks if we have completed adding all our children
                        arrRefChildren.length === arrRefChildren.length
                    ) {
                        return res.status(200).send('Children added correctly');
                    }

                }).catch((error) => {
                    return res.status(500).send(error.message);
                });
            });

        }
    });

// ---------------------------------------------------------
router.get(
    '/children',
    authenticated,
    isParent,
    (req, res) => {
        const firestore  = admin.firestore();
        const userID     = req.user_id;
        let fullChildren = [];

        firestore.collection(
            'users'
        ).doc(userID).get().then((snapshot) => {

            let children = snapshot.data().children;

            children.forEach((child) => {

                firestore.collection(
                    'children'
                ).doc(child).get().then((snap) => {

                    let childData = snap.data();
                    childData.id = child;
                    fullChildren.push(childData);
                    if(
                        fullChildren.length === children.length
                    ) {
                        return res.status(200).json(fullChildren);
                    }

                }).catch((error) => {
                   return res.status(500).send(error.message);
                });
            });
        }).catch((error) => {
            return res.status(500).send(error.message);
        });
    });

// ---------------------------------------------------------
router.put(
    '/children/:id',
    authenticated,
    isParent,
    (req, res) => {
        const firestore  = admin.firestore();
        const userId     = req.user_id;
        const childEdit  = req.params.id;
        const FirstName = req.body.FirstName;
        const LastName = req.body.LastName;
        const TeamNumber = req.body.TeamNumber

        if (!FirstName && !LastName && !TeamNumber) {
            return res.status(401).send('Missing body');
        }

        firestore.collection(
            'users'
        ).doc(userId).get().then((snapshot) => {
            let user = snapshot.data();
            let exists = user.children.includes(childEdit);
            if (exists) {

                firestore.collection(
                    'children'
                ).doc(childEdit).update({
                    FirstName: FirstName,
                    LastName: LastName,
                    TeamNumber: TeamNumber
                }).then(() => {
                    return res.status(200).send('Child updated');
                }).catch((error) => {
                    return res.status(500).send(error.message);
                });

            } else {
                return res.status(404).send("Could not find child");
            }

        }).catch((error) => {
            return res.status(500).send(error.message);
        });
    });

module.exports = router;
