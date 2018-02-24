var express = require('express');
var router = express.Router();
var Products = require('../models/Products');
 
router.get('/:user_cpf?/:code?', function(req, res, next) {

    if (req.params.code) {

        Products.getProductByCode(req.params.user_cpf, req.params.code, function(err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {

        Products.getAllProducts(req.params.user_cpf, function(err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }

        });
    }
});
router.post('/:user_cpf?', function(req, res, next) {

    Products.addProduct(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});
router.delete('/:user_cpf?/:code?', function(req, res, next) {

    Products.deleteProduct(req.params.user_cpf, req.params.code, function(err, count) {

        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }

    });
});
router.put('/:user_cpf?/:code?', function(req, res, next) {

    Products.updateProduct(req.params.user_cpf, req.params.code, req.body, function(err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
