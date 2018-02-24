var express = require('express');
var router = express.Router();
var Customers = require('../models/Customers');

router.get('/:vendor_cpf?', function (req, res, next) {
    Customers.getAllCustomers(req.params.vendor_cpf, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
router.post('/:vendor_cpf?/:customer_cpf?', function (req, res, next) {
    Customers.addCustomer(req.params.vendor_cpf, req.params.customer_cpf, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count); 
        }
    });
});
router.delete('/:vendor_cpf?/:customer_cpf?', function (req, res, next) {
    Customers.deleteCustomer(req.params.vendor_cpf, req.params.customer_cpf, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }

    });
});

module.exports = router;
