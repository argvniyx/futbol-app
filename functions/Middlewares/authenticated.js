const admin = require('firebase-admin');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        admin.auth().verifyIdToken(token).then(() => {
            next();
        }).catch((error) => {
            res.status(400).json(error);
        });
    } catch(error) {
        res.status(401).send('Auth failed!');
    }
};
