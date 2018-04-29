var db = require('../dbconnection'); //reference of dbconnection.js

var Sales = {

    getAllSalesByVendor: function(vendor_cpf, callback) {
        return db.query("select * from sales where vendor_cpf=?", [vendor_cpf], callback);
    },
    getAllSalesByVendorWithDetails: function(vendor_cpf, callback) {
        return db.query("select nickname, user_name, customer_cpf, date_time, products_product_code, products_product_version, product_name, quantity, price, paid_amount from sales s join users u on s.customer_cpf = u.cpf join products p on p.id_product = s.products_id_product where s.vendor_cpf = ?", [vendor_cpf], callback);
    },
    getSalesByCustomerName: function(vendor_cpf, customer_cpf, callback) {
        return db.query("select * from sales where vendor_cpf=? and customer_cpf=?", [vendor_cpf, customer_cpf], callback);
    },
    getAllSales: function(callback) {
        return db.query("select * from sales", callback);
    },
    addSale: function(Sales, callback) {
        return db.query("insert into sales(vendor_cpf, customer_cpf, products_id_product, products_product_code, products_product_version, quantity, date_time) values(?,?,?,?,?,?,?)", [Sales.vendor_cpf, Sales.customer_cpf, Sales.products_id_product, Sales.products_product_code, Sales.products_product_version, Sales.quantity, Sales.date_time], callback);
    },
    deleteSale: function(vendor_cpf, customer_cpf, date_time, callback) {
        return db.query("delete from sales where vendor_cpf=? and customer_cpf=? and date_time=?", [vendor_cpf, customer_cpf, date_time], callback);
    },
    updateSale: function(Sales, callback) {
        return db.query("update sales set paid_amount=? where vendor_cpf=? and customer_cpf=? and products_product_code=? and products_product_version=? and date_time=? and quantity=?", [Sales.paid_amount, Sales.vendor_cpf, Sales.customer_cpf, Sales.products_product_code, Sales.products_product_version, Sales.date_time, Sales.quantity], callback);
    }

};
module.exports = Sales;
