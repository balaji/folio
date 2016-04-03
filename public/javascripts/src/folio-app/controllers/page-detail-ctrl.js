(function () {
    "use strict";
    function PageDetailCtrl($scope, $state, $cookieStore, facebookService, $, $uibModal) {
        var pageId = $state.params.page_id;
        var paToken = null;
        if (angular.isDefined($cookieStore.get("pageAccessToken"))) {
            paToken = $cookieStore.get("pageAccessToken");
        }

        if (!paToken) {
            $state.go("index");
            return;
        }

        $scope.showLikesModal = function() {
            $uibModal.open({
                templateUrl: "templates/likes-modal.html",
                controller: 'LikesCtrl'
            })
        };
        
        $scope.loadInsights = function () {
            $state.go("page_insights", {page_id: pageId});
        };

        facebookService.getPageDetails(pageId, paToken).then(function (response) {
            $scope.pageDetails = JSON.parse(response.data[0].body);
            $scope.albums = JSON.parse(response.data[1].body);

            var batch = [];
            $($scope.albums.data).each(function (i, album) {
                batch.push({
                    "method": "GET", "relative_url": album.id + "?fields=name,link"
                });
            });

            if (batch.length !== 0) {
                facebookService.batchRequest(paToken, batch).then(function (response) {
                    $scope.albumData = {accessToken: paToken, albums: []};
                    $(response.data).each(function (i, data) {
                        $scope.albumData.albums.push(JSON.parse(data.body));
                    });
                });
            } else {
                $scope.albums = {albums: []};
            }
        });
    }

    angular
        .module("Folio")
        .controller("PageDetailCtrl",
            ["$scope", "$state", "$cookieStore", "facebookService", "jQueryService", "$uibModal",
                PageDetailCtrl]);
}());
