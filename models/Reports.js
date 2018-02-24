var db = require('../dbconnection'); //reference of dbconnection.js

var Reports = {

    getDataToReport: function(vendor_cpf, callback) {
        return db.query("select product_name, sum(quantity) as total_sold from sales s join products p on p.id_product = s.products_id_product where vendor_cpf=? group by products_id_product;", [vendor_cpf], callback);
    }

};
module.exports = Reports;
