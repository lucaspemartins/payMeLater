var db = require('../dbconnection'); //reference of dbconnection.js

var Purchases = {

    getAllPurchasesByCustomer: function(customer_cpf, callback) {
        return db.query("select nickname, user_name, vendor_cpf, date_time, products_product_code, products_product_version, product_name, quantity, price, paid_amount from sales s join users u on s.vendor_cpf = u.cpf join products p on p.id_product = s.products_id_product where s.customer_cpf = ?", [customer_cpf], callback);
    }

};
module.exports = Purchases;
