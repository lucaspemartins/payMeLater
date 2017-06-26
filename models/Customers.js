var db = require('../dbconnection'); //reference of dbconnection.js

var Customers = {

    getAllCustomers: function(callback) {

        return db.query("select * from customers", callback);

    },
    getCustomerByCpf: function(cpf, callback) {

        return db.query("select * from customers where cpf=?", [cpf], callback);
    },
    addCustomer: function(Customers, callback) {
        return db.query("insert into customers(cpf, customer_name, cellphone, telephone, email) values(?,?,?,?,?)", [Customers.cpf, Customers.customer_name, Customers.cellphone, Customers.telephone, Customers.email], callback);
    },
    deleteCustomer: function(cpf, callback) {
        return db.query("delete from customers where cpf=?", [cpf], callback);
    },
    updateCustomer: function(cpf, Customers, callback) {
        return db.query("update customers set customer_name=?,cellphone=?,telephone=?,email=? where cpf=?", [Customers.customer_name, Customers.cellphone, Customers.telephone, Customers.email, cpf], callback);
    }

};
module.exports = Customers;
