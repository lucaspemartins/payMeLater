var db = require('../dbconnection'); //reference of dbconnection.js

var Reports = {

    getDataToReport: function(callback) {
        return db.query("select product_name, sum(quantity) as total_sold from customers_has_products s join products p on p.id_product = s.products_id_product group by products_id_product;", callback);
    }

};
module.exports = Reports;
