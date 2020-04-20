const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

router.post('/sing-up', (req, res) => {
    return res.status(200).send({
        Email: req.body.Email,
        Password: req.body.Password
    });
});

module.exports = router;
