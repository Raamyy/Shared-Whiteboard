var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(8000);  //Listen to port 8000

app.use(express.static('public'));  // use the files in public folder

console.log("server is running!");

var io=socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log(socket.id); // log the socket id of incoming connection

    socket.on('draw',onDraw);  // event function triggered when a client draw something on his screen
    socket.on('clear',onClear); // event function triggered when a client clears the screen 

    function onDraw(data){
        console.log(data);
        socket.broadcast.emit('draw',data); // send the draw data to all other clients to draw it
    }

    function onClear(){
        console.log("broadcast clear");
        socket.broadcast.emit('clear'); // send clear message to all other clients to clear thier screens also
    }

}


