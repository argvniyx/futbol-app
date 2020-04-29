const admin = require('firebase-admin');

module.exports = (req, res, next) => {

    const uid = req.user_id;

    admin.firestore().collection(
        'users'
    ).doc(uid).get().then((snapshot) => {
        let user = snapshot.data();
        const TypeUser = 3;
        if (snapshot.exists && user.TypeUser === 3) {
            next();
        } else if(
            // this is for the parent doesnt exist on our user
            // table
            !snapshot.exists
        ) {
            // add to our user table
            admin.firestore().collection(
                'users'
            ).doc(uid).set({
                uid: uid,
                TypeUser: TypeUser,
                children: []
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
