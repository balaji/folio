"use strict";
function PostDetailCtrl($scope, $state, $cookieStore, facebookService, $sce) {
    var postId = $state.params.post_id;
    var paToken = null;
    if (angular.isDefined($cookieStore.get("pageAccessToken"))) {
        paToken = $cookieStore.get("pageAccessToken");
    }

    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    };

    $scope.publish = function (postId) {
        $scope.unPublishedPosts = null;
        $scope.publishedPosts = null;
        facebookService.publishPost(postId, paToken).then(function (response) {
            if (response.data) {
                $scope.addAlert("Post published!!!", "success");
                $state.go("page", {page_id: postId.split("_")[0]});
            }
        });
    };

    $scope.delete = function (postId) {
        $scope.unPublishedPosts = null;
        $scope.publishedPosts = null;
        facebookService.deletePost(postId, paToken).then(function (response) {
            if (response.data) {
                $scope.addAlert("Post deleted!!!", "success");
                $state.go("page", {page_id: postId.split("_")[0]});
            }
        });
    };

    if (!paToken) {
        $state.go("index");
        return;
    }
    $scope.filterInsightsBy = "lifetime";

    facebookService.getPostDetails(postId, paToken).then(function (response) {
        $scope.postDetails = JSON.parse(response.data[0].body);
        $scope.postInsights = JSON.parse(response.data[1].body);
    });
}

angular
    .module("Folio")
    .controller("PostDetailCtrl", ["$scope", "$state", "$cookieStore", "facebookService", "$sce", PostDetailCtrl]);
