var db = require('../dbconnection'); //reference of dbconnection.js

var Customers = {

    getAllCustomers: function(vendor_cpf, callback) {
        return db.query("select * from Users where cpf in (select customer_cpf from Vendors_Has_Customers where vendor_cpf=?)", [vendor_cpf], callback);
    },
    addCustomer: function(vendor_cpf, customer_cpf, callback) {
        return db.query("insert into Vendors_Has_Customers(vendor_cpf, customer_cpf) values(?,?)", [vendor_cpf, customer_cpf], callback);
    },
    deleteCustomer: function(vendor_cpf, customer_cpf, callback) {
        return db.query("delete from Vendors_Has_Customers where vendor_cpf=? and customer_cpf=?", [vendor_cpf, customer_cpf], callback);
    }

};
module.exports = Customers;
