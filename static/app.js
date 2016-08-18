var app = angular.module('socketiochat', []);
app.controller("appController", ['$scope', function ($scope) {

    $scope.messages = [];
    $scope.name = "";
    var socket = io();

    setTimeout(function () {
        $('.name').focus(function () {
            $(this).keyup(function (e) {
                if(e.keyCode == 13){
                    $scope.name = $(this).val();
                    $scope.$apply();
                }
            });
        });
    }, 0.1);

    $("#chatForm").submit(function () {
        socket.emit("chat_message", $("#message").val());
        $("#message").val('');
        return false;
    });
    socket.on("chat_message", function (msg) {
        $scope.messages.push(msg);
        $scope.$apply();
    });
}]);
