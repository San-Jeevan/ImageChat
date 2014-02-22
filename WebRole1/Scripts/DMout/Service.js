var myModule = angular.module('DMservice', []);

myModule.factory('DMoutDB', function($rootScope, $timeout, $window, $http) {
    var api_server = "http://dmoutDB.cloudapp.net:8080";
    //var api_server = "http://localhost";

    return {
        getCommentsForMatch: function(matchid,type) {
            return $http.get(api_server + '/api/getCommentsForMatch/'+ matchid+'/'+type).then(function (result) {
                $rootScope.$broadcast("getCommentsForMatch_Received", result.data);
            });
        },



        PostComment: function (nickname, comment, matchid) {
            var commentpacket = {
                "comment": comment,
                "matchid": matchid,
                "guestnick": nickname
            };
            return $http.post(api_server + '/api/addComment', commentpacket).then(function (result) {
                $rootScope.$broadcast("addComment_Received", result.data);
        });
    }
    };
}
);