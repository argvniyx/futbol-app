const admin = require('firebase-admin');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        admin.auth().verifyIdToken(
            token
        ).then((result) => {
            req.user_id = result.user_id;
            next();
        }).catch((error) => {
            return res.status(400).json(error.message);
        });
    } catch(error) {
        return res.status(401).send('Auth failed!');
    }
};
