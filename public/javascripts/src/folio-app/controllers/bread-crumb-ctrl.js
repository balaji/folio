/* jshint browser: true */
(function () {
    "use strict";
    function BreadCrumbCtrl($scope, $rootScope, $) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams) {
            
            $scope.crumbs = [{name: "Dashboard", link: "#/"}];
            $("li.sidebar-list").removeClass("active");
            var pageId = toParams.page_id;

            var sideBarLink = $("a[data-page-id='" + pageId + "']");
            switch (toState.name) {
                case "edit_post":
                case "new_post":
                case "page_settings":
                case "page_insights":
                case "post_insights":
                    $scope.crumbs.push({
                        name: document.getElementById(pageId).value,
                        link: "#/" + pageId
                    });
                    sideBarLink.parent().addClass("active");
            }

            switch (toState.name) {
                case "page":
                    $scope.crumbs.push({
                        name: document.getElementById(pageId).value
                    });
                    sideBarLink.parent().addClass("active");
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
                        link: "#/" + pageId + "/settings"
                    });
                    $scope.crumbs.push({
                        name: "Insights"
                    });
                    break;

                case "post_insights":
                    $scope.crumbs.push({
                        name: "Post Details",
                        link: "#/" + pageId + "/post/" + toParams.post_id
                    });
                    $scope.crumbs.push({
                        name: "Insights"
                    });
                    break;

                default:
                    $scope.crumbs = [{name: "Dashboard"}];
                    $("#dashboard-item").addClass("active");
            }
        });
    }

    angular
        .module("Folio")
        .controller("BreadCrumbCtrl", ["$scope", "$rootScope", "jQueryService", BreadCrumbCtrl]);
}());