var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(8000);

app.use(express.static('public'));

console.log("server is running!");

var io=socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log(socket.id);

    socket.on('draw',onDraw);
    socket.on('clear',onClear);

    function onDraw(data){
        console.log(data);
        socket.broadcast.emit('draw',data);
    }

    function onClear(){
        console.log("broadcast clear");
        socket.broadcast.emit('clear');
    }

}


