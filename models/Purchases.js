var db = require('../dbconnection'); //reference of dbconnection.js

var Purchases = {

    getAllPurchasesByCustomer: function(customer_cpf, callback) {
        return db.query("select * from sales where customer_cpf=?", [customer_cpf], callback);
    }

};
module.exports = Sales;
