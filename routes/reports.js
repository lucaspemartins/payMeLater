var express = require('express');
var router = express.Router();
var Reports = require('../models/Reports');
 
router.get('/:vendor_cpf?', function(req, res, next) {

    Reports.getDataToReport(req.params.vendor_cpf, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
