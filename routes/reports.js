var express = require('express');
var router = express.Router();
var Reports = require('../models/Reports');
 
router.get('/', function(req, res, next) {

    Reports.getDataToReport(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
