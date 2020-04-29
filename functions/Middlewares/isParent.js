const admin = require('firebase-admin');

module.exports = (req, res, next) => {

    const uid      = req.user_id;
    const UserType = 3;


    admin.firestore().collection(
        'users'
    ).doc(uid).get().then((snapshot) => {
        let user = snapshot.data();
        if (
            // checks that if exits and corresponding role
            snapshot.exists &&
            user.UserType === UserType
        ) {
            next();
        } else if(
            // this is for the parent doesnt exist on our user
            // table, we create them
            !snapshot.exists
        ) {
            // add to our user table
            admin.firestore().collection(
                'users'
            ).doc(uid).set({
                uid: uid,
                UserType: UserType,
            }).then(() => {
                next();
            }).catch((error) => {
                return res.status(500).json(error.message);
            });

        } else {
            return res.status(401).send('You are not authorized to do that');
        }
    }).catch((error) => {
        return res.status(500).send(error.message);
    });
};
