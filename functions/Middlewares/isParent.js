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
            return res.status(401).send('You are not authorized to do that');
        }
    }).catch((error) => {
        return res.status(500).send(error.message);
    });
};
