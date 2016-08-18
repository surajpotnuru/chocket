/**
 * Created by SURAJ on 8/18/2016.
 */

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Messages = require('./models/messages');

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/socketchat");


app.use("/static",express.static("static"));

app.get("/",function(req,res){
    res.sendFile(__dirname + '/index.html');
});
var testMessages = {
  "messages":[
      {
          "name":"test1",
          "msg":"hello"
      },
      {
          "name":"test2",
          "msg": "hiii"
      }
  ]
};
app.get("/api/getAllMessages",function(req,res){
    Messages.getAllMessages(function(err,messages){
        if(err){
            throw err;
        }
        res.json(messages);
    });
});
io.on("connection",function(socket){
    console.log('An user connected');
    socket.on("disconnect",function(){
       console.log("User Disconnected");
    });
    socket.on("chat_message",function(msg){
        Messages.saveMessage(msg);
        io.emit("chat_message",msg);
    });
});

http.listen(3000);