var module = angular.module("RISK", ["RISKservice", "RISKdirectives", "RISKFilter", "eCloseIT.controllers", "ui.bootstrap"]);


angular.module("eCloseIT.controllers", []).
	controller("TestController", ["$scope", "$window", function ($scope, $window) {

	}])


    .controller('postPictureCtrl', function (RISKsocket, $scope, $window, $modal, $rootScope, $modalInstance) {

        $scope.postImage = function (url) {
            RISKsocket.emit("c:lobbyimage", url);
            $modalInstance.close();
        };


    })



	.controller("RISKctrl", function ($scope, $window, $rootScope, RISKsocket, $modal) {

	    $scope.messages = [];
	    $scope.users = [];


	    $scope.currentRoom = "";
	    $scope.myNick = "";

	    $scope.templates = [{ name: 'Game', url: 'GameLobby.html' }, { name: 'Lobby', url: 'MainLobby.html' }];
	    $scope.template = { name: 'Lobby', url: 'MainLobby.html' };


	    //lobby
	    RISKsocket.on('connect', function (data) {
	        var msg = {};
	        msg.username = 'SERVER';
	        msg.time = new Date();
	        msg.content = "Connected to server!";

	        $scope.myNick = RISKsocket.socket.sessionid;
	        $scope.messages.push(msg);

	        function randomName() {
	            var randomnumber = Math.floor(Math.random() * 100);
	            var name = "Guest" + randomnumber;
	            return name;
	        }
	        RISKsocket.emit("c:changename", { nickname: randomName() })
	    });

	    RISKsocket.on('s:changename', function (data) {
	        if (data == 404) { }
	        else if (data == 200) {
	            RISKsocket.emit("c:joinroom", { room: 'misc' });
	        }
	    });


	    $scope.sendLobbyMessage = function (msg) {
	        RISKsocket.emit("c:msg", msg);
	        $scope.chatMessage = '';
	    }


	    RISKsocket.on('s:msg', function (data) {
	        $scope.messages.push(data);
	    });


	    RISKsocket.on('s:playerlist', function (data) {
	        $scope.users = data;

	    });

	    RISKsocket.on('s:playerleft', function (data) {
	        $scope.users = _.without($scope.users, data)

	    });


	    RISKsocket.on('s:playerjoined', function (data) {
	        $scope.users.push(data);

	    });

	    $scope.leaveRoom = function () {
	        RISKsocket.emit("c:leaveroom", '');
	    }


	    RISKsocket.on('s:leaveroom', function (data) {
	        if (data == 200) { $scope.template = $scope.templates[1]; }

	    });

	    RISKsocket.on('s:lobbyimage', function (data) {
	        $scope.messages.push(data);

	    });


	    $scope.usernameClicked = function (username) {
	        $scope.chatMessage += username;
	    };

	    RISKsocket.on('s:recentimages', function (data) {
	        for (var i = 0; i < data.length; i++) {
	            $scope.messages.push(data[i]);
	        }

	    }
        );



	    //popupwindows
	    $scope.postPicture = function () {
	        var modalInstance = $modal.open({
	            templateUrl: 'uploadWndContent.html',
	            controller: 'postPictureCtrl'
	        });
	    };

	})




;
