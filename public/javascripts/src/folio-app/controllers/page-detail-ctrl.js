(function () {
    "use strict";
    function PageDetailCtrl($scope, $state, $cookieStore, facebookService) {
        var pageId = $state.params.page_id;
        var paToken = null;
        if (angular.isDefined($cookieStore.get("pageAccessToken"))) {
            paToken = $cookieStore.get("pageAccessToken");
        }

        if (!paToken) {
            $state.go("index");
            return;
        }

        $scope.filterInsightsBy = "lifetime";

        facebookService.getPageDetails(pageId, paToken).then(function (response) {
            $scope.pageDetails = JSON.parse(response.data[0].body);
            $scope.pageInsights = JSON.parse(response.data[1].body);
        });
    }

    angular
        .module("Folio")
        .controller("PageDetailCtrl", ["$scope", "$state", "$cookieStore", "facebookService", PageDetailCtrl]);
}());
