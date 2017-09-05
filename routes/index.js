var express = require('express');
var path = require('path');
var router = express.Router();

//app.use(express.static(__dirname + '/views'));
//app.use(express.static(path.join(__dirname, 'views')));
//app.use(express.static('views'));
//app.get('/', function(req, res) {
//    res.sendfile('index.html', {root: path.join(__dirname, '../views')});
//});
router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next(); 
});

router.get('/',function(req,res){
       
     res.sendFile('views/index.html');

});
module.exports = router; 
//var server = app.listen(process.env.PORT || 80);
