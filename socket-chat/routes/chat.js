var express = require('express');
var router = express.Router();

//var app = module.parent.exports;
//var http = require('http').Server(app)
//var io = require('socket.io')(http)

/* GET home page. */
router.get('/', function (req, res) {
    res.render('chat/login');
})
.post('/room', function (req, res) {
    res.render('chat/index', { user: req.body.user })
})
;

module.exports = router;
