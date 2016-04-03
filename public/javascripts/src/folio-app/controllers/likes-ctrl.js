(function () {
    "use strict";
    function LikesCtrl($scope, $state, $cookieStore, $http, facebookService) {
        var objectId = $state.params.post_id;
        if(!objectId) {
            objectId = $state.params.page_id;
        }
        var paToken = null;
        if (angular.isDefined($cookieStore.get("pageAccessToken"))) {
            paToken = $cookieStore.get("pageAccessToken");
        }
        
        if (!paToken) {
            $state.go("index");
            return;
        }
        
        $scope.loadMore = function(url) {
            $scope.likes = null;
            $http.get(url).then(function (response) {
                $scope.likes = response.data;
            });
        };

        facebookService.getLikes(objectId, paToken).then(function (response) {
            $scope.likes = response.data;
        });
    }

    angular
        .module("Folio")
        .controller("LikesCtrl", 
            ["$scope", "$state", "$cookieStore", "$http", "facebookService", LikesCtrl]);
})();