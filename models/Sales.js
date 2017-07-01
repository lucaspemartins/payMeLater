var db = require('../dbconnection'); //reference of dbconnection.js

var Sales = {

    getCustomerByName: function(name, callback) {
        return db.query("select cpf from customers where customer_name=?", [name], callback);
    },
    getAllSales: function(callback) {
        return db.query("select * from customers_has_products s join products p on s.products_id_product = p.id_product join customers c on s.customers_cpf = c.cpf", callback);
    },
    addSale: function(Sales, callback) {
        return db.query("insert into customers_has_products(customers_cpf, products_id_product, products_product_code, products_product_version, quantity) values(?,?,?,?,?)", [Sales.customers_cpf, Sales.products_id_product, Sales.products_product_code, Sales.products_product_version, Sales.quantity], callback);
    },
    deleteSale: function(cpf, product_code, product_version, callback) {
        return db.query("delete from customers_has_products where customers_cpf=? and products_product_code=? and products_product_version=?", [cpf, product_code, product_version], callback);
    },
    updateSale: function(quantity, Sales, callback) {
        return db.query("update customers_has_products set quantity=? where customers_cpf=? and products_product_code=? and products_product_version=?", [quantity, Sales.customers_cpf, Sales.products_product_code, Sales.products_product_version], callback);
    }

};
module.exports = Sales;
