(function () {
    "use strict";

    function InsightsCtrl($scope, $state, $cookieStore, facebookService) {
        var paToken = null;
        if (angular.isDefined($cookieStore.get("pageAccessToken"))) {
            paToken = $cookieStore.get("pageAccessToken");
        }

        if (!paToken) {
            $state.go("index");
            return;
        }

        $scope.filterInsightsBy = "lifetime";
        var objectId;
        if ($state.params.post_id) {
            objectId = $state.params.post_id;
        } else {
            objectId = $state.params.page_id;
        }
        
        facebookService.insights(objectId, paToken).then(function (response) {
            $scope.insights = response.data;
        });
    }

    angular
        .module("Folio")
        .controller("InsightsCtrl", ["$scope", "$state", "$cookieStore", "facebookService", InsightsCtrl]);
})();