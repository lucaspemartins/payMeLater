var express = require('express');
var router = express.Router();
var Sales = require('../models/Sales');
 
router.get('/', function(req, res, next) {
    
    Sales.getAllSales(function(err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }

    });
});
router.post('/', function(req, res, next) {

    Sales.addSale(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 &amp;amp;amp; 0
        }
    });
});
router.delete('/:cpf?/:product_code?/:product_version?', function(req, res, next) {

    if (req.params.cpf && req.params.product_code && req.params.product_version) {
        Sales.deleteSale(req.params.cpf, req.params.product_code, req.params.product_version, function(err, count) {

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
router.put('/:quantity?', function(req, res, next) {

    Sales.updateSale(req.params.quantity, req.body, function(err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
