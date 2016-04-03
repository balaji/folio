/* jshint browser: true */
(function () {
    "use strict";
    function BreadCrumbCtrl($scope, $rootScope) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams) {
            
            $scope.crumbs = [{name: "Folio", link: "#/"}];

            switch (toState.name) {
                case "edit_post":
                case "new_post":
                case "page_settings":
                case "page_insights":
                case "post_insights":
                    $scope.crumbs.push({
                        name: document.getElementById(toParams.page_id).value,
                        link: "#/" + toParams.page_id
                    });
            }

            switch (toState.name) {
                case "page":
                    $scope.crumbs.push({
                        name: document.getElementById(toParams.page_id).value
                    });
                    break;

                case "edit_post":
                    $scope.crumbs.push({
                        name: "Post Details"
                    });
                    break;

                case "new_post":
                    $scope.crumbs.push({
                        name: "New Post"
                    });
                    break;

                case "page_settings":
                    $scope.crumbs.push({
                        name: "Page Details"
                    });
                    break;

                case "page_insights":
                    $scope.crumbs.push({
                        name: "Page Details",
                        link: "#/" + toParams.page_id + "/settings"
                    });
                    $scope.crumbs.push({
                        name: "Insights"
                    });
                    break;

                case "post_insights":
                    $scope.crumbs.push({
                        name: "Post Details",
                        link: "#/" + toParams.page_id + "/post/" + toParams.post_id
                    });
                    $scope.crumbs.push({
                        name: "Insights"
                    });
                    break;

                default:
                    $scope.crumbs = [{name: "Folio"}];
            }
        });
    }

    angular
        .module("Folio")
        .controller("BreadCrumbCtrl", ["$scope", "$rootScope", BreadCrumbCtrl]);
}());