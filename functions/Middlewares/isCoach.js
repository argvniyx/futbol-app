const admin = require('firebase-admin');

// Middleware to check if the user that is making the 
// request is a Coach or not
module.exports = (req, res, next) => {

    // Get the user data
    const uid = req.user_id;
    const UserType = 2;

    // Get the user collection (Table)
    admin.firestore().collection(
        'users'
    ).doc(uid).get().then((snapshot) => {
        // Get the user data from the firebase
        let user = snapshot.data();

        // Checks that if exits and corresponding role
        if (snapshot.exists && user.UserType === UserType){
                next();

        // Return the unauthorized error
        } else {
            return res.status(401).send('You are not authorized to do that');
        }

    }).catch((error) => {
        return res.status(500).send(error.message);
    });
};