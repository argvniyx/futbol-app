const express = require('express');
const admin = require('firebase-admin');

// Routes app
const router = express.Router();

// Load the middlewares
const authenticated = require('../Middlewares/authenticated');
const isAdmin = require('../Middlewares/isAdmin.js');


// ---------------------------------------------------------
// Create a new team
router.post('/', authenticated, isAdmin, (req, res) => {
    // Get the request body 
    const Name = req.body.Name;
    const ColorFont = req.body.ColorFont;
    const ColorBackground = req.body.ColorBackground;
    const SeasonStart = req.body.SeasonStart;
    const SeasonEnd = req.body.SeasonEnd;
    var CoachID = req.body.CoachID;

    // Check that the request has the complete body
    if (!Name ||
        !ColorFont ||
        !ColorBackground ||
        !SeasonStart ||
        !SeasonEnd) {

        return res.status(400).send('Missing body');
    }

    // Check if the Coach ID does not 
    // exists on the request
    if (!CoachID) {
        CoachID = "";
    }

    // Add team object to the collection
    admin.firestore().collection('teams').add({
        Name: Name,
        CoachID: CoachID,
        ColorFont: ColorFont,
        ColorBackground: ColorBackground,
        SeasonStart: SeasonStart,
        SeasonEnd: SeasonEnd,
        MembersID: [],
        Events: []
    })

        // Return the success code and message
        .then((teams) => {

            // If the request has a CoachID
            if (CoachID != "") {
                console.log(teams);
                // Add the TeamID to the Coach
                admin.firestore().collection('users')
                    .doc(CoachID).update({
                        "TeamID": teams.id
                    })

                    // Catch any posible error
                    .catch((error) => {
                        return res.status(500).send(error.message);
                    });
            }

            return res.status(200).send('Team created successfully');
        })
        // Return the error code and message
        .catch((error) => {
            return res.status(500).json(error.message);
        });
});


// ---------------------------------------------------------
// Add a Coach to a team
router.put('/add-Coach', (req, res) => {

    // Get the params
    const CoachID = req.query.CoachID;
    const TeamID = req.query.TeamID;

    // If any param is missing
    if (!CoachID || !TeamID) {
        return res.status(400).send('Missing Query Params');
    }

    // Get the team object
    admin.firestore().collection('teams').doc(TeamID)
    .get().then(TeamObj => {
       
        // Check if the Team exists
        if(!TeamObj.exists){
            return res.status(404).send('The Teams does not exists');

        // Check if the team already has a Coach        
        }else if (TeamObj.data().CoachID != ''){
            return res.status(409).send('The Team already has a Coach');
        }

        // Get the Coach object
        admin.firestore().collection('users').doc(CoachID)
        .get().then(CoachObj => {
        
            // Check if the Team exists
            if(!CoachObj.exists){
                return res.status(404).send('The Coach does not exists');

            // Check if the team already has a Coach        
            }else if (CoachObj.data().TeamID != ""){
                return res.status(409).send('The Coach already has a Team');
            }

            console.log("Here")


            // Add the CoachID to the Team
            admin.firestore().collection('teams')
            .doc(TeamID).update({
                "CoachID": CoachID
            })

            // If all was correct...
            .then(() => {
                console.log("Here2");
                // Add the TeamID to the Coach
                admin.firestore().collection('users')
                    .doc(CoachID).update({
                        "TeamID": TeamID
                    })
                    // Coach added succesfully
                    .then(() => {
                        console.log("Here3");
                        return res.status(200).send("Coach Added!");
                    })

                    // Catch any posible error
                    .catch((error) => {
                        return res.status(500).send(error.message);
                    });
            })

            // Catch any posible error
            .catch((error) => {
                return res.status(500).send(error.message);
            });
            
        })
        // Catch any posible error
        .catch(err => {
            console.log('Error searching the team', err);
        });        
    })
    // Catch any posible error
    .catch(err => {
        console.log('Error searching the team', err);
    });

});


// // ---------------------------------------------------------
// router.delete('/:id', (req, res) => {

//     //Get the Team ID
//     const ID = req.params.id;

//     // Check that the request has the complete body
//     if (!ID) {
//         return res.status(400).send('The TeamID is missing');
//     }

//     console.log(ID)

//     // Send the success code and messa  ge
//     admin.firestore().collection("teams").doc(ID).delete().then(() => {
//         return res.status(200).send("Team successfully deleted!");

//     // Send the error code and message
//     }).catch((error) => {
//         return res.status(500).json(error.message);
//     });
// });

module.exports = router;
