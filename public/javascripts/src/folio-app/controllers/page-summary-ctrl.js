(function () {
    "use strict";

    function PageSummaryCtrl($scope, $state, $http, $cookieStore, facebookService) {
        var pageId = $state.params.page_id;
        var paToken = null;
        if (angular.isDefined($cookieStore.get("pageAccessToken"))) {
            paToken = $cookieStore.get("pageAccessToken");
        }

        if (!paToken) {
            $state.go("index");
            return;
        }

        var loadAllPosts = function () {
            facebookService.getAllPosts(pageId, paToken).then(function (response) {
                var unpublished = JSON.parse(response.data[0].body);
                var published = JSON.parse(response.data[1].body);
                $scope.unPublishedPosts = addType(unpublished, "UN_PUB");
                $scope.publishedPosts = addType(published, "PUB");
            });
        };

        var addType = function (posts, flag, dir, prevPosts) {
            posts.type = flag;
            if (prevPosts && prevPosts.count !== undefined) {
                posts.count = dir == "next" ? prevPosts.count + 1 : prevPosts.count - 1;
            } else {
                posts.count = 0;
            }
            posts.pageId = pageId;
            return posts;
        };

        var paginate = function (response, prevPosts, dir, flag) {
            var returnObj;
            if (!response.data.paging) {
                returnObj = prevPosts;
                if (dir === "prev") returnObj.paging.previous = null;
                if (dir === "next") returnObj.paging.next = null;
            } else {
                returnObj = addType(response.data, flag, dir, prevPosts);
            }
            return returnObj;
        };

        $scope.loadMore = function (url, flag, dir) {
            var prevPubPosts, prevUnPubPosts;
            if (flag === "PUB") {
                prevPubPosts = $scope.publishedPosts;
                $scope.publishedPosts = null; //needed for loading indicator
                $http.get(url).then(function (response) {
                    $scope.publishedPosts = paginate(response, prevPubPosts, dir, flag);
                });
            } else {
                prevUnPubPosts = $scope.unPublishedPosts;
                $scope.unPublishedPosts = null; //needed for loading indicator
                $http.get(url).then(function (response) {
                    $scope.unPublishedPosts = paginate(response, prevUnPubPosts, dir, flag);
                });
            }
        };

        var countPosts = function () {
            $scope.totalPosts = 0;
            $scope.totalUnPosts = 0;
            $scope.tpLoading = true;
            $scope.tuLoading = true;
            $http.get("https://graph.facebook.com/" + pageId +
                "/posts?limit=100&fields=id&access_token=" + paToken).then(function (response) {
                countMore(response.data, "PUB");
            });
            $http.get("https://graph.facebook.com/" + pageId +
                "/promotable_posts?limit=100&fields=id&is_published=false&access_token=" + paToken).then(function (response) {
                countMore(response.data, "UN_PUB");
            });
        };

        var countMore = function (posts, flag) {
            if (flag === "PUB") $scope.totalPosts += posts.data.length;
            else $scope.totalUnPosts += posts.data.length;

            if (posts.data.length === 100) {
                $http.get(posts.paging.next).then(function (response) {
                    countMore(response.data, flag);
                });
            } else {
                if (flag === "PUB") $scope.tpLoading = false;
                else $scope.tuLoading = false;
            }
        };

        $scope.newPost = function () {
            $state.go("new_post", {page_id: pageId});
        };

        $scope.settings = function () {
            $state.go("page_settings", {page_id: pageId});
        };

        countPosts();
        loadAllPosts();
    }

    angular
        .module("Folio")
        .controller("PageSummaryCtrl", ["$scope", "$state", "$http", "$cookieStore", "facebookService", PageSummaryCtrl]);
}());
