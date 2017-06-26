var mysql=require('mysql');
var connection=mysql.createPool({
 
 host:'localhost',
 user:'root',
 password:'root',
 database:'SELL_ON_CREDIT_DB'
 
});
module.exports=connection;
