var express = require('express');
var router = express.Router();
var Users = require('../models/Users');

router.get('/:nickname?', function (req, res, next) {

    Users.getCpfByNickname(req.params.nickname, function (err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;