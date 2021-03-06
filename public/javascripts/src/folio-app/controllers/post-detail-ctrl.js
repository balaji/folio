(function () {
    "use strict";
    function PostDetailCtrl($scope, $state, $cookieStore, $uibModal, facebookService, $sce) {
        var postId = $state.params.post_id;
        var pageId = $state.params.page_id;
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

        $scope.showLikesModal = function () {
            $uibModal.open({
                templateUrl: "templates/likes-modal.html",
                controller: "LikesCtrl"
            });
        };

        $scope.showCommentsModal = function () {
            $uibModal.open({
                templateUrl: "templates/comments-modal.html",
                controller: "CommentsCtrl"
            });
        };

        $scope.publish = function (postId) {
            $scope.unPublishedPosts = null;
            $scope.publishedPosts = null;
            facebookService.publishPost(postId, paToken).then(function (response) {
                if (response.data) {
                    $scope.addAlert("Post published!!!", "success");
                    $state.go("page", {page_id: pageId});
                }
            });
        };

        $scope.delete = function (postId) {
            $scope.unPublishedPosts = null;
            $scope.publishedPosts = null;
            facebookService.deletePost(postId, paToken).then(function (response) {
                if (response.data) {
                    $scope.addAlert("Post deleted!!!", "success");
                    $state.go("page", {page_id: pageId});
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
            $scope.attachments = JSON.parse(response.data[3].body).data[0];
            var totalImpressionsData = JSON.parse(response.data[4].body).data;
            if (totalImpressionsData && totalImpressionsData.length > 0) {
                $scope.views = totalImpressionsData[0].values[0] && totalImpressionsData[0].values[0].value;
            }
        });
    }

    angular
        .module("Folio")
        .controller("PostDetailCtrl", ["$scope", "$state", "$cookieStore", "$uibModal", "facebookService", "$sce", PostDetailCtrl]);
}());
