var db = require('../dbconnection'); //reference of dbconnection.js

var Users = {

    getAllUsers: function(callback) {
        return db.query("select * from Users", callback);
    },
    getAllUsersWithoutMe: function(cpf, callback) {
        return db.query("select * from Users where cpf not like ?", [cpf], callback);
    },
    getUserByCpf: function(cpf, callback) {
        return db.query("select * from Users where cpf=?", [cpf], callback);
    },
    getCpfByNickname: function(nickname, callback) {
        return db.query("select cpf from Users where nickname=?", [nickname], callback);
    },
    addUser: function(Users, callback) {
        return db.query("insert into Users(cpf, nickname, user_name, cellphone, telephone, email) values(?,?,?,?,?,?)", [Users.cpf, Users.nickname, Users.user_name, Users.cellphone, Users.telephone, Users.email], callback);
    },
    deleteUser: function(cpf, callback) {
        return db.query("delete from Users where cpf=?", [cpf], callback);
    },
    updateUser: function(cpf, Users, callback) {
        return db.query("update Users set user_name=?,nickname=?,cellphone=?,telephone=?,email=? where cpf=?", [Users.user_name, Users.nickname, Users.cellphone, Users.telephone, Users.email, cpf], callback);
    }

};
module.exports = Users;