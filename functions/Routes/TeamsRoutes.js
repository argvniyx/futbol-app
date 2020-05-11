const express = require('express');
const admin = require('firebase-admin');

// Routes app
const router = express.Router();

// Load the middlewares
const authenticated = require('../Middlewares/authenticated');
const isAdmin = require('../Middlewares/isAdmin.js');


// ---------------------------------------------------------
// Create a new team
router.post('/', (req, res) => {
    // Get the request body
    const Name = req.body.Name;
    const ColorFont = req.body.ColorFont;
    const ColorBackground = req.body.ColorBackground;
    const SeasonStart = req.body.SeasonStart;
    const SeasonEnd = req.body.SeasonEnd;
    let CoachID = req.body.CoachID;

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
        if (CoachID !== "") {
            // Add the TeamID to the Coach
            admin.firestore().collection('users')
                .doc(CoachID).update({
                    "TeamID": teams.id
                })

                // Catch any posible error
                .catch((err) => {
                    return res.status(500).send(err.message);
                });
        }

        return res.status(200).send('Team created successfully');
    })
    // Return the error code and message
    .catch((err) => {
        return res.status(500).json(err.message);
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

            // Add the CoachID to the Team
            admin.firestore().collection('teams')
            .doc(TeamID).update({
                "CoachID": CoachID
            })

            // If all was correct...
            .then(() => {
                // Add the TeamID to the Coach
                admin.firestore().collection('users')
                    .doc(CoachID).update({
                        "TeamID": TeamID
                    })
                    // Coach added succesfully
                    .then(() => {
                        return res.status(200).send("Coach Added!");
                    })

                    // Catch any posible error
                    .catch((err) => {
                        return res.status(500).send(err.message);
                    });
            })

            // Catch any posible error
            .catch((err) => {
                return res.status(500).send(err.message);
            });

        })
        // Catch any posible error
        .catch(err => {
            return res.status(500).send(error.message);
        });
    })
    // Catch any posible error
    .catch(err => {
        return res.status(500).send(error.message);
    });

});



// ---------------------------------------------------------
// Get a list of teams (For children registration)
router.get('/listTeams', (req, res) => {

    // Temporal array for saving the teams
    listTeams = []

    // Get the list of documents from the teams collections
    admin.firestore().collection('teams')
    .get().then(Teams => {

        // Make the list with just the Team ID and Name
        Teams.forEach(team => {
          listTeams.push({
              "TeamID": team.id,
              "Name": team.data().Name
          })
        });

        // Send the list to the client
        return res.status(200).send(listTeams);

      })

    // Catch any error
    .catch(err => {
        return res.status(500).json(err.message);
    });

});



// ---------------------------------------------------------
// Get a list of teams (For children registration)
router.get('/noCoach', (req, res) => {

    // Temporal array for saving the teams
    listTeams = []

    // Get all the teams that has no coach
    admin.firestore().collection('teams')
    .where('CoachID', '==', '').get()
    .then(Teams => {

        // Make the list with just the Team ID and Name
        Teams.forEach(team => {
            listTeams.push({
                "TeamID": team.id,
                "Name": team.data().Name
            })
          });

        // Send the list to the client
        return res.status(200).send(listTeams);

    })
    .catch(err => {
        return res.status(500).json(err.message);
    });
});



// ---------------------------------------------------------
// Get all the information about all the other parents of the team
router.get('/:id', (req, res) => {

    //Get the Team ID
    const TeamID = req.params.id;

    // List to store the ParentsID
    ParentsID = []
    // List to store the Parents Object
    ParentsList = []

    // Check that the request has the complete body
    if (!TeamID) {
        return res.status(400).send('The TeamID is missing');
    }

    // Get the team object
    admin.firestore().collection('teams').doc(TeamID)
    .get().then(TeamObj => {

        // Check if the Team exists
        if(!TeamObj.exists){
            return res.status(404).send('The Teams does not exists');
        }

        // For each child, search the parent
        TeamObj.data().MembersID.forEach((ChildID) => {

            // Get the child object
            admin.firestore().collection('children').doc(ChildID).get()
            .then((ChildObj) => {
                // Store the ParentID
                ParentsID.push(ChildObj.data().ParentID)

                // Check if it has all parents ID
                if(ParentsID.length == TeamObj.data().MembersID.length){

                    // Get all the users list
                    admin.auth().listUsers()
                    .then((listUsers) => {

                        // Filter the list to just the one that are parents from the team
                        filtered = listUsers['users'].filter(f => ParentsID.includes(f['uid']));

                        // Filter the user information
                        filtered.forEach(userObj => {
                            ParentsList.push({
                                "UserID": userObj.uid,
                                "Email": userObj.email,
                                "Phone": userObj.phone,
                                "Name": userObj.displayName
                            })
                        });

                        // Send the success code and array
                        return res.status(200).json(ParentsList);
                    })
                    // Catch any error
                    .catch(err => {
                        return res.status(500).json(err.message);
                    });
                }

            })
            // Catch any error
            .catch(err => {
                return res.status(500).json(err.message);
            });
        })
    })
    // Catch any error
    .catch(err => {
        return res.status(500).json(err.message);
    });
});


// ---------------------------------------------------------
// Delete a team
router.delete('/:id', (req, res) => {

    //Get the Team ID
    const TeamID = req.params.id;

    // Check that the request has the complete body
    if (!TeamID) {
        return res.status(400).send('The TeamID is missing');
    }

     // Get the team object
     admin.firestore().collection('teams').doc(TeamID)
     .get().then(TeamObj => {

         // Check if the Team exists
         if(!TeamObj.exists){
             return res.status(404).send('The Teams does not exists');
         }

         // Unlink the coach from the team
         admin.firestore().collection('users')
         .doc(TeamObj.data().CoachID).update({
             "TeamID": ""
         })


         // Unlink all the memebers (childrens) from the team
         TeamObj.data().MembersID.forEach((Child) => {
            admin.firestore().collection('children')
            .doc(Child).update({
                "TeamID": ""
            })
         });

        // Send the success code and messa  ge
        admin.firestore().collection("teams").doc(TeamID).delete().then(() => {
            return res.status(200).send("Team successfully deleted!");

        // Send the error code and message
        }).catch((err) => {
            return res.status(500).json(err.message);
        });
     });
});



module.exports = router;
