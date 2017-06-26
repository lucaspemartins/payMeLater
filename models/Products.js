var db = require('../dbconnection'); //reference of dbconnection.js

var Products = {

    getAllProducts: function(callback) {

        return db.query("select * from products", callback);

    },
    getProductByCode: function(code, callback) {

        return db.query("select * from products where product_code=?", [code], callback);
    },
    addProduct: function(Products, callback) {
        return db.query("insert into products(id_product, product_code, product_version, product_name, price) values(?,?,?,?,?)", [Products.id_product, Products.product_code, Products.product_version, Products.product_name, Products.price], callback);
    },
    deleteProduct: function(code, callback) {
        return db.query("delete from product where product_code=?", [code], callback);
    },
    updateProduct: function(code, Products, callback) {
        return db.query("update products set product_name=?, product_version=?, price=? where product_code=?", [Products.product_name, Products.product_version, Products.price, code], callback);
    }

};
module.exports = Products;
