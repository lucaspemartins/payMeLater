var express = require('express');
var router = express.Router();
var Users = require('../models/Users');

router.get('/:cpf?', function (req, res, next) {

    Users.getAllUsersWithoutMe(req.params.cpf, function (err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;