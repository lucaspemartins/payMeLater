var db = require('../dbconnection'); //reference of dbconnection.js

var Products = {

    getAllProducts: function(user_cpf, callback) {
        return db.query("select * from products where user_cpf=?", [user_cpf], callback);
    },
    getProductByCode: function(user_cpf, code, callback) {
        return db.query("select * from products where user_cpf=? and product_code=?", [user_cpf, code], callback);
    },
    addProduct: function(Products, callback) {
        return db.query("insert into products(id_product, product_code, product_version, product_name, price, user_cpf) values(?,?,?,?,?,?)", [Products.id_product, Products.product_code, Products.product_version, Products.product_name, Products.price, Products.user_cpf], callback);
    },
    deleteProduct: function(user_cpf, code, callback) {
        return db.query("delete from products where user_cpf=? and product_code=?", [user_cpf, code], callback);
    },
    updateProduct: function(user_cpf, code, Products, callback) {
        return db.query("update products set product_name=?, product_version=?, price=? where user_cpf=? and product_code=?", [Products.product_name, Products.product_version, Products.price, user_cpf, code], callback);
    }

};
module.exports = Products;
