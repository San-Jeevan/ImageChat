var myModule = angular.module('RISKservice', []);

myModule.factory('RISKsocket', function($rootScope, $timeout, $window, $http) {
  

    var socket = io.connect('http://127.0.0.1:1337');
    return {
        socket : socket.socket,
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };

}
);