var express = require('express');
var router = express.Router();
var Users = require('../models/Users');

router.get('/:cpf?', function (req, res, next) {
    if (req.param.cpf) {
        Users.getUserByCpf(req.params.cpf, function (err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
    else {
        Users.getAllUsers(function (err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});
router.post('/', function (req, res, next) {

    Users.addUser(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 &amp;amp;amp; 0
        }
    });
});
router.delete('/:cpf?', function (req, res, next) {

    Users.deleteUser(req.params.cpf, function (err, count) {

        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }

    });
});
router.put('/:cpf?', function (req, res, next) {

    Users.updateUser(req.params.cpf, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
