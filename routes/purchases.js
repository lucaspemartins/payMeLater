var express = require('express');
var router = express.Router();
var Purchases = require('../models/Purchases');

router.get('/:customer_cpf?', function (req, res, next) {

        Sales.getAllPurchasesByCustomer(req.params.customer_cpf, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
});

module.exports = router;
