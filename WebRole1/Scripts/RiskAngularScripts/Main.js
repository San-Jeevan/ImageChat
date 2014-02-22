var module = angular.module("RISK", ["RISKservice", "RISKdirectives", "RISKFilter", "eCloseIT.controllers"]);


angular.module("eCloseIT.controllers", []).
	controller("TestController", ["$scope", "$window", function ($scope, $window) {

	}])



	.controller("RISKctrl", function ($scope, $window, $rootScope, RISKsocket) {
	    angular.element

	    $scope.matchid = 1; //get matchID from server
        $scope.lobbymessages = [];
        $scope.roommessages = [];
        $scope.commentlist = [];
        $scope.games = [];

        $scope.roomusers = [];
        $scope.users = [];

        $scope.templates = [{ name: 'Game', url: 'GameLobby.html' }, { name: 'Lobby', url: 'MainLobby.html' }];
        $scope.template = $scope.templates[1];
        $scope.currentRoom = "";
        $scope.myNick = "";
	    
        $scope.quickSwitch = function () {
            $scope.template = $scope.template == $scope.templates[0] ? $scope.templates[1] : $scope.templates[0];

        };


        //lobby
	    RISKsocket.on('connect', function (data) {
	        var msg = {};
	        
	        msg.username = 'SERVER';
	        msg.time = new Date();
	        msg.content = "Connected to server!";
	        console.log(RISKsocket);
	        $scope.myNick = RISKsocket.socket.sessionid;
	        $scope.lobbymessages.push(msg);
	    });

	    $scope.sendLobbyMessage = function (msg) {
	        RISKsocket.emit("c:lobbymessage", msg);
	        $scope.chatMessage = '';
	    }


	    RISKsocket.on('s:playerlist', function (data) {
	        $scope.users = data;
	    });

	    RISKsocket.on('s:playerleft', function (data) {
	        $scope.users = _.reject($scope.users, function (playerid) { return playerid == data })
	    });


	    RISKsocket.on('s:playerjoined', function (data) {
	        $scope.users.push(data);
	    });


	    RISKsocket.on('s:gamelist', function (data) {
	        $scope.games = data;
	    });


	    RISKsocket.on('s:lobbymessage', function (data) {
	        $scope.lobbymessages.push(data);
	      
	    });
	    

	    //room
	    RISKsocket.on('s:joinroom', function (data) {
	        $scope.template = $scope.templates[0];
	        $scope.currentRoom = _.findWhere($scope.games, { id: data.roomid });
	        console.log($scope.myNick);
	        console.log($scope.currentRoom);

	    });


	    $scope.sendRoomMessage = function (msg) {
	        RISKsocket.emit("c:roommessage", msg);
	        $scope.chatRoomMessage = '';
	    }

	    RISKsocket.on('s:roomplayerlist', function (data) {
	        $scope.roomusers = data;
	        console.log(data);
	    });

	    RISKsocket.on('s:roomplayerleft', function (data) {
	        $scope.roomusers = _.reject($scope.roomusers, function (playerid) { return playerid == data })
	     
	    });


	    RISKsocket.on('s:roomplayerjoined', function (data) {
	        $scope.roomusers.push(data);
	        
	    });

	    RISKsocket.on('s:roommessage', function (data) {
	        $scope.roommessages.push(data);
	        
	      
	    });

	    $scope.leaveRoom = function () {
	        RISKsocket.emit("c:leaveroom", '');
	    }


	    RISKsocket.on('s:leaveroom', function (data) {
	        if (data == 200) { $scope.template = $scope.templates[1]; }

	    });

	   

	    $scope.usernameClicked = function (username) {
	        $scope.chatMessage+=username;
	    };

	    //$scope.newGamePopup = function () {
	    //    var modalInstance = $modal.open({
	    //        templateUrl: 'Content/partials/NewGame.html',
	    //        controller: 'newGameController'
	    //    });
	    //};

	    $scope.joinGame = function (gameid) {
	        RISKsocket.emit("c:joinroom", { id: gameid });
	    }

	    $scope.startGame = function () {
	        RISKsocket.emit("c:startgame", { id: $scope.currentRoom.id });
	    }


	})



//.controller('newGameController', function ($scope, $modalInstance, $rootScope, RISKsocket) {

//    $scope.playernumber = [2, 3, 4, 5, 6];


//    $scope.create = function (gametitle, gameplayer) {
//        var game = {};
//        game.name = gametitle;
//        game.players = gameplayer;

//        RISKsocket.emit('c:newgame', game);
//    };

//    RISKsocket.on('s:newgame', function (data) {
//        if (data.status == 200) {
//            $modalInstance.close();
//        }
//        else {
//            console.log("game was not created");
//        }
//    });


//    $scope.cancel = function () {
//        $modalInstance.dismiss('cancel');
//    };
//}
//)
;
