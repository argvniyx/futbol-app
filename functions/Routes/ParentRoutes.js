const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

const authenticated = require('../Middlewares/authenticated');
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
            children: []
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
                    parentID: userID,
                    TeamID: child.TeamID,
                    Absence: 0
                }).then((docRef) => {

                    arrRefChildren.push(docRef.id);
                    // add every children id to the parent
                    firestore.collection(
                        'users'
                    ).doc(userID).update({
                        // this helps us add our children if it has data in the array
                        children: admin.firestore.FieldValue.arrayUnion(docRef.id)
                    }).then().catch((error) => {
                        return res.status(500).send(error.message);
                    });

                    firestore.collection(
                        'teams'
                    ).doc(child.TeamID).update({
                        MembersID: admin.firestore.FieldValue.arrayUnion(docRef.id)
                    }).then().catch((error) => {
                        return res.status(500).send(error.message);
                    });

                }).catch((error) => {
                    return res.status(500).send(error.message);
                });
            });

            return res.status(200).send('Children added correctly');
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
            if(children.length > 0) {
                children.forEach((child) => {

                    firestore.collection(
                        'children'
                    ).doc(child).get().then((snap) => {

                        let childData = snap.data();
                        childData.id = child;
                        fullChildren.push(childData);
                        if (
                            fullChildren.length === children.length
                        ) {
                            return res.status(200).json(fullChildren);
                        }
                    }).catch((error) => {
                        return res.status(500).send(error.message);
                    });

                });
            } else {
                return res.status(200).json([]);
            }

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
        const TeamNumber = req.body.TeamNumber;
        const TeamID = req.body.TeamID;
        const Absence = req.body.Absence;

        if (
            // validate we have everything
            !FirstName &&
            !LastName &&
            !TeamNumber &&
            !TeamID &&
            !Absence
        ) {
            return res.status(401).send('Missing body');
        }

        firestore.collection(
            'users'
        ).doc(userId).get().then((snapshot) => {
            let user = snapshot.data();
            let exists = user.children.includes(childEdit);
            if (
                // makes sure the child exist for the parent
                exists
            ) {

                let orgTeamID;
                firestore.collection(
                    'children'
                ).doc(childEdit).get().then((doc) => {

                    orgTeamID = doc.data().TeamID;
                    if(
                        // check the original team if we have it
                        orgTeamID !== ""
                    ) {
                        // remove the original team
                        firestore.collection(
                            'teams'
                        ).doc(orgTeamID).update({
                            MembersID: admin.firestore.FieldValue.arrayRemove(childEdit)
                        }).catch((error) => {
                            return res.status(500).send(error.message);
                        });
                    }

                    // update the child
                    firestore.collection(
                        'children'
                    ).doc(childEdit).update({
                        FirstName: FirstName,
                        LastName: LastName,
                        TeamNumber: TeamNumber,
                        parentID: userId,
                        Absence: Absence,
                        TeamID: TeamID
                    }).then(() => {

                        if(
                            // if we have the teamID, we added to the team
                            TeamID !== ""
                        ) {
                            firestore.collection(
                                'teams'
                            ).doc(TeamID).update({
                                MembersID: admin.firestore.FieldValue.arrayUnion(childEdit)
                            }).catch((error) => {
                                return res.status(500).send(error.message);
                            });
                        }
                        return res.status(200).send('Child updated');

                    }).catch((error) => {
                        return res.status(500).send(error.message);
                    });

                }).then((error) => {
                    return res.status(500).send(error.message);
                });

            } else {
                return res.status(404).send("Could not find child");
            }

        }).catch((error) => {
            return res.status(500).send(error.message);
        });
    });


// ---------------------------------------------------------
router.put(
    '/:id',
    // authenticated,
    // isParent,
    (req, res) => {
    
    // Get the request body 
    const Email = req.body.Email;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Cellphone = req.body.Cellphone;

    // Get the param id
    const ParentID = req.params.id;

    
    // Check if the request has the ParentID as param
    if(!ParentID){
        return res.status(400).send('Missing ParentID as param');
    }
    
    // Check that the request has the complete body
    if (!Email ||
        !FirstName ||
        !LastName || 
        !Cellphone) {
            return res.status(400).send('Missing body');
    }
        
    // Get the coach object
    admin.firestore().collection('users').doc(ParentID)
    .get().then(UserObj => {
        
        // Check if the coch exists
        if(!UserObj.exists){
            return res.status(404).send('The Parent does not exists');
        }
        
        // Check that the user it is a Coach
        if(UserObj.data().UserType != 3){
            return res.status(401).send('The user it is not a parent');
        }
        
        // Make the update
        admin.auth().updateUser(ParentID, {
            email: Email,
            displayName: FirstName + ' ' + LastName,
            phoneNumber: Cellphone
        })
        .then(()=>{
            return res.status(200).send("Parent Updated!")
        })
        // Catch any error
        .catch((error) => {
            return res.status(500).json(error.message);
        });
    })
    // Catch any error
    .catch((error) => {
        return res.status(500).json(error.message);
    });
});

// ---------------------------------------------------------
router.delete(
    '/children/:id',
    authenticated,
    isParent,
    (req, res) => {
        const firestore = admin.firestore();
        const userId = req.user_id;
        const childDelete = req.params.id;

        firestore.collection(
            'users'
        ).doc(userId).get().then((snapshot) => {
            let user = snapshot.data();
            let exists = user.children.includes(childDelete);
            if(
                // just verify it exists
                exists
            ) {

                // rmove from parent
                firestore.collection(
                    'users'
                ).doc(userId).update({
                    children: admin.firestore.FieldValue.arrayRemove(childDelete)
                }).then(() => {

                    // get the team id to eliminate him from there
                    firestore.collection(
                        'children'
                    ).doc(childDelete).get().then((doc) => {
                        const teamID =  doc.data().TeamID;

                        if(
                            // verify the team exists and remove it
                            teamID !== ""
                        ) {
                            firestore.collection(
                                'teams'
                            ).doc(teamID).update({
                                MembersID: admin.firestore.FieldValue.arrayRemove(childDelete)
                            }).catch((error) => {
                               return res.status(500).send(error.message);
                            });
                        }

                        // delete the child from the children table
                        firestore.collection(
                            'children'
                        ).doc(childDelete).delete().then(() => {
                            return res.status(200).send('Child deleted');
                        }).catch((error) => {
                            return res.status(500).send(error.message);
                        });

                    }).catch((error) => {
                        return res.status(500).send(error.message());
                    })

                }).catch((error) => {
                    return res.status(500).send(error.message);
                });

            } else {
                return res.status(404).send('Could not find child');
            }
        }).catch((error) => {
            return res.status(500).send(error.message);
        });
    });

module.exports = router;
