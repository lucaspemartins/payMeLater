var express = require('express');
var router = express.Router();
var Sales = require('../models/Sales');

router.get('/:vendor_cpf?/:customer_cpf?', function (req, res, next) {

    if (req.params.customer_cpf) {

        Sales.getSalesByCustomerName(req.params.vendor_cpf, req.params.customer_cpf, function (err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        
        Sales.getAllSalesByVendor(req.params.vendor_cpf, function (err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }

        });
    }
});
router.post('/', function (req, res, next) {

    Sales.addSale(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); 
        }
    });
});
router.delete('/:vendor_cpf?/:customer_cpf?/:date_time?', function (req, res, next) {

    if (req.params.vendor_cpf && req.params.customer_cpf && req.params.date_time) {
        Sales.deleteSale(req.params.vendor_cpf, req.params.customer_cpf, req.params.date_time, function (err, count) {

            if (err) {
                res.json(err);
            } else {
                res.json(count);
            }

        });
    } else {
        res.sendStatus(400);
    }
});
router.put('/', function (req, res, next) {

    Sales.updateSale(req.body, function (err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
