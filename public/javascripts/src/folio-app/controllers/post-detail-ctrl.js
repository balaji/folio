(function () {
    "use strict";
    function PostDetailCtrl($scope, $rootScope, $state, $cookieStore, $uibModal, facebookService, $sce) {
        var postId = $state.params.post_id;
        var paToken = null;
        if (angular.isDefined($cookieStore.get("pageAccessToken"))) {
            paToken = $cookieStore.get("pageAccessToken");
        }

        if (!paToken) {
            $state.go("index");
            return;
        }
        
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        };

        $scope.showLikesModal = function() {
          $uibModal.open({
              templateUrl: "templates/likes-modal.html",
              controller: 'LikesCtrl'
          })
        };
        
        $scope.showCommentsModal = function() {
          $uibModal.open({
              templateUrl: "templates/comments-modal.html",
              controller: 'CommentsCtrl'
          })
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

        $scope.loadInsights = function () {
            $state.go("post_insights", {post_id: postId, page_id: $state.params.page_id});
        };

        facebookService.getPostDetails(postId, paToken).then(function (response) {
            $scope.postDetails = JSON.parse(response.data[0].body);
            $scope.likesCount = JSON.parse(response.data[1].body);
            $scope.commentsCount = JSON.parse(response.data[2].body);
        });
    }

    angular
        .module("Folio")
        .controller("PostDetailCtrl", ["$scope", "$rootScope", "$state", "$cookieStore","$uibModal", "facebookService", "$sce", PostDetailCtrl]);
}());
