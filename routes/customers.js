var express = require('express');
var router = express.Router();
var Customers = require('../models/Customers');
 
router.get('/:cpf?', function(req, res, next) {

    if (req.params.cpf) {

        Customers.getCustomerByCpf(req.params.cpf, function(err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {

        Customers.getAllCustomers(function(err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }

        });
    }
});
router.post('/', function(req, res, next) {

    Customers.addCustomer(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 &amp;amp;amp; 0
        }
    });
});
router.delete('/:cpf?', function(req, res, next) {

    Customers.deleteCustomer(req.params.cpf, function(err, count) {

        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }

    });
});
router.put('/:cpf', function(req, res, next) {

    Customers.updateCustomer(req.params.cpf, req.body, function(err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
