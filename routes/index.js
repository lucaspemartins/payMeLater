var express = require('express'),
app = express();

//app.use(express.static(__dirname + '/views'));
app.use(express.static(path.join(__dirname, 'views')));
app.get('/', function(req, res) {
    res.sendfile('index.html', {root: path.join(__dirname, '../views')});
});
var server = app.listen(process.env.PORT || 80);
