const admin = require('firebase-admin');

module.exports = (req, res, next) => {

    const uid = req.user_id;

    admin.firestore().collection(
        'users'
    ).doc(uid).get().then((snapshot) => {
        let user = snapshot.data();
        if (user.TypeUser === 3) {
            next();
        } else {
            res.status(401).send('You are not authorized to do that');
        }
    }).catch((error) => {
        res.status(500).send(error.message);
    });
};
