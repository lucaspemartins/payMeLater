var db = require('../dbconnection'); //reference of dbconnection.js

var Users = {

    getAllUsers: function(callback) {
        return db.query("select * from users", callback);
    },
    getAllUsersWithoutMe: function(cpf, callback) {
        return db.query("select * from users where cpf not in (select customer_cpf from vendors_has_customers where vendor_cpf=?) and cpf not like ?", [cpf, cpf], callback);
    },
    getUserByCpf: function(cpf, callback) {
        return db.query("select * from users where cpf=?", [cpf], callback);
    },
    getCpfByNickname: function(nickname, callback) {
        return db.query("select cpf from users where nickname=?", [nickname], callback);
    },
    getUserByEMailAndPass: function(email, password, callback) {
        return db.query("select * from users where email=? and password=?", [email, password], callback);
    },
    addUser: function(Users, callback) {
        return db.query("insert into users(cpf, nickname, user_name, password, cellphone, telephone, email) values(?,?,?,?,?,?,?)", [Users.cpf, Users.nickname, Users.user_name, Users.password, Users.cellphone, Users.telephone, Users.email], callback);
    },
    deleteUser: function(cpf, callback) {
        return db.query("delete from users where cpf=?", [cpf], callback);
    },
    updateUser: function(cpf, Users, callback) {
        return db.query("update users set user_name=?,nickname=?,cellphone=?,telephone=?,email=? where cpf=?", [Users.user_name, Users.nickname, Users.cellphone, Users.telephone, Users.email, cpf], callback);
    }

};
module.exports = Users;