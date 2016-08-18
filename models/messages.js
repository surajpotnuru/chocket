var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    name:{
        type: String
    },
    msg:{
        type: String
    }
});

var messageModel = mongoose.model('message',messageSchema);
var Messages = module.exports = messageModel;

module.exports.getAllMessages = function(callback,limit){
    console.log("Inside");
    messageModel.find(callback).limit(limit);
};

module.exports.saveMessage = function(message){
  console.log("Message got"+message);
};

