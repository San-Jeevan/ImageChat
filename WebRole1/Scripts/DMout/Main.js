var module = angular.module("DMout", ["DMservice", "DMdirectives", "DMFilter", "ngRoute", "eCloseIT.controllers", "ui.bootstrap"]).
  config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(false);
      $routeProvider
       .when('/', { templateUrl: 'Content/partials/Main.html', controller: "DMctrl" })
      .when('/About', { templateUrl: 'Content/partials/About.html'})
      .otherwise({ redirectTo: '/' });
  }]);


angular.module("eCloseIT.controllers", []).
	controller("TestController", ["$scope", "$window", function ($scope, $window) {

	}])



	.controller("DMctrl", function ($scope, $window, $rootScope, DMoutDB) {

	    $scope.matchid = 1; //get matchID from server
	    
	    $scope.commentlist = [];
	    

	    DMoutDB.getCommentsForMatch(1,100);


	    $scope.refresh = function() {
	        DMoutDB.getCommentsForMatch(1,100);
	    };

	    $scope.$on("getCommentsForMatch_Received", function(event, args) {
	        $scope.commentlist = args;
	        
	    });
	    
	    $scope.$on("addComment_Received", function (event, args) {
	        DMoutDB.getCommentsForMatch(1,100);
	        $scope.commentMessage = '';
	    });

	    $scope.PostComment = function (nickname, message) {
	        DMoutDB.PostComment(nickname, message, $scope.matchid);
	    };

	});
