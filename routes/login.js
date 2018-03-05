var express = require('express');
var router = express.Router();
var Users = require('../models/Users');

router.get('/:email?/:password?', function (req, res, next) {
    if (req.params.email && req.params.password) {
        Users.getUserByEMailAndPass(req.params.email, req.params.password, function (err, count) {
            if (err) {
                res.json(err);
            } else {
                res.json(count);
            }
        });
    }
});

module.exports = router;
