var db = require('../dbconnection'); //reference of dbconnection.js

var Customers = {

    getAllCustomers: function(vendor_cpf, callback) {
        return db.query("select * from users where cpf in (select customer_cpf from vendors_has_customers where vendor_cpf=?)", [vendor_cpf], callback);
    },
    addCustomer: function(vendor_cpf, customer_cpf, callback) {
        return db.query("insert into vendors_has_customers(vendor_cpf, customer_cpf) values(?,?)", [vendor_cpf, customer_cpf], callback);
    },
    deleteCustomer: function(vendor_cpf, customer_cpf, callback) {
        return db.query("delete from vendors_has_customers where vendor_cpf=? and customer_cpf=?", [vendor_cpf, customer_cpf], callback);
    }

};
module.exports = Customers;
