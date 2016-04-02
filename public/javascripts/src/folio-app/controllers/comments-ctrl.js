(function () {
    "use strict";
    function CommentsCtrl($scope, $state, $cookieStore, $http, facebookService) {
        var postId = $state.params.post_id;
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

        facebookService.getPostComments(postId, paToken).then(function (response) {
            $scope.comments = response.data;
            console.log(response.data);
        });
    }

    angular
        .module("Folio")
        .controller("CommentsCtrl",
            ["$scope", "$state", "$cookieStore", "$http", "facebookService", CommentsCtrl]);
})();