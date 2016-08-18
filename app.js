/**
 * Created by SURAJ on 8/18/2016.
 */

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use("/static",express.static("static"));

app.get("/",function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.on("connection",function(socket){
    console.log('An user connected');
    socket.on("disconnect",function(){
       console.log("User Disconnected");
    });
    socket.on("chat_message",function(msg){
        console.log(msg);
        io.emit("chat_message",msg);
    });
});

http.listen(3000);