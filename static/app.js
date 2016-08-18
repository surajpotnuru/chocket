var app = angular.module('socketiochat', []);
app.controller("appController", ['$scope', function ($scope) {

    $scope.messages = [];
    $scope.name = "";
    var socket = io();

    $scope.startChat = function(){
        $scope.name = $('.name').val();
        $scope.$apply();
    };

    $scope.sendMessage = function () {
        socket.emit("chat_message", $("#message").val());
        $("#message").val('');
    };
    socket.on("chat_message", function (msg) {
        $scope.messages.push(msg);
        $scope.$apply();
    });
}]);
