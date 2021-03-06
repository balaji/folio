(function () {
    "use strict";

    function InsightsCtrl($scope, $rootScope, $state, $cookieStore, facebookService, $, FB) {
        var paToken = null;
        if (angular.isDefined($cookieStore.get("pageAccessToken"))) {
            paToken = $cookieStore.get("pageAccessToken");
        }

        if (!paToken) {
            $state.go("index");
            return;
        }

        $scope.filterInsightsBy = "lifetime";
        var objectId = $state.params.post_id ? $state.params.post_id : $state.params.page_id;

        var insights = function() {
            facebookService.insights(objectId, paToken).then(function (response) {
                $scope.insights = response.data;
                var data = $scope.insights.data;
                $.each(data, function (i, datum) {
                    var values = datum.values;
                    if (values.length > 0) {
                        var recentValue = values[values.length - 1];
                        if (recentValue.value && typeof recentValue.value === "object") {
                            delete recentValue.value.total; //removing aggregate data for charts.
                            $scope.insights.data[i].keys = Object.keys(recentValue.value);
                            var objValues = [];
                            var total = 0;
                            for (var key in recentValue.value) {
                                if (recentValue.value.hasOwnProperty(key)) {
                                    var val = recentValue.value[key];
                                    if (!Number.isInteger(val)) {
                                        val = 0;
                                    }
                                    objValues.push(val);
                                    total += val;
                                }
                            }
                            //avoiding the case where the chart has all 0s resulting in no chart.
                            if (total > 0) {
                                $scope.insights.data[i].objValues = objValues;
                            }
                        }
                    }
                });
            });
        };

        var readInsights = function (attempted) {
            facebookService.hasPermission($cookieStore.get("webAccessToken"), "read_insights").then(function (hasPermission) {
                if (hasPermission) {
                    insights();
                } else {
                    if (!attempted) {
                        FB.login(function () {
                            tryReadingInsights(true);
                        }, {scope: "read_insights"});
                    } else {
                        $scope.disableControls = false;
                        $scope.insights = [];
                        $rootScope.addAlert("Sorry. Cannot read insights without permission.", "danger");
                    }
                }
            });
        };

        var tryReadingInsights = function (attempted) {
            facebookService.withAccessToken(function () {
                readInsights(attempted);
            });
        };

        tryReadingInsights(false);
    }

    angular
        .module("Folio")
        .controller("InsightsCtrl", ["$scope", "$rootScope", "$state", "$cookieStore", "facebookService", "jQueryService", "facebookSDK", InsightsCtrl]);
})();