const express = require('express');
const admin = require('firebase-admin');

// Routes app
const router = express.Router();

// Load the middlewares
const authenticated = require('../Middlewares/authenticated');
const isCoach = require('../Middlewares/isCoach.js');

// ---------------------------------------------------------
// Create a new coach
router.post('/sign-up', (req, res) => {

    // Get the request body 
    const Email = req.body.Email;
    const Password = req.body.Password;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Phone = req.body.Phone;
    let TeamID = req.body.TeamID; 
    const UserType = 2;

    // Check that the request has the complete body
    if (!Email ||
        !Password ||
        !FirstName ||
        !LastName || 
        !Phone) {
        return res.status(400).send('Missing body');
    }

    // Check if the Team ID does not
    // exists on the request
    if(!TeamID){
        TeamID = "";
    }

    // Create a user on the Auth collection of firebase
    admin.auth().createUser({
        email: Email,
        password: Password,
        displayName: FirstName + ' ' + LastName,
        phoneNumber: Phone })

    // If the user were added correctly...
    .then((user) => {

        // Add the coach  our user table
        admin.firestore().collection('users')
            // Make the object
            .doc(user.uid).set({
                uid: user.uid,
                UserType: UserType,
                TeamID: TeamID })

        // Return the success code and message
        .then(() => {
            
            // If the request has a TeamID
            if (TeamID != "") {

                // Add the CoachID to the TeamID
                admin.firestore().collection('teams')
                .doc(TeamID).update({
                    "CoachID": user.uid
                })

                // Catch any posible error
                .catch((err) => {
                    return res.status(500).send(err.message);
                });
            }
            
            return res.status(200).send( 'Coach created successfully'); })
        
        // Return the error code and message
        .catch((error) => {
            return res.status(500).json(error.message); });

    // If the Auth user could not be
    }).catch((error) => {
        return res.status(500).json(error.message);
    });
});


// ---------------------------------------------------------
// Update coach info
router.put('/:id', (req, res) => {
    
    // Get the request body 
    const Email = req.body.Email;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Phone = req.body.Phone;

    // Get the param id
    const CoachID = req.params.id;

    // Check if the request has the CoachID as param
    if(!CoachID){
        return res.status(400).send('Missing CoachID as param');
    }
    
    // Check that the request has the complete body
    if (!Email ||
        !FirstName ||
        !LastName || 
        !Phone) {
        return res.status(400).send('Missing body');
    }

     // Get the coach object
     admin.firestore().collection('users').doc(CoachID)
     .get().then(UserObj => {

        // Check if the coch exists
        if(!UserObj.exists){
            return res.status(404).send('The Coach does not exists');
        }

        // Check that the user it is a Coach
        if(UserObj.data().UserType != 2){
            return res.status(401).send('The user it is not a coach');
        }

        // Make the update
        admin.auth().updateUser(CoachID, {
            email: Email,
            displayName: FirstName + ' ' + LastName,
            phoneNumber: Phone
        })
        .then(()=>{
            return res.status(200).send("Coach Updated!")
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

module.exports = router;