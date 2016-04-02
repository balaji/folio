/* jshint browser: true */
(function () {
    "use strict"; 
    function BreadCrumbCtrl($scope, $rootScope) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams) {
            var pageId;
            $scope.crumbs = [{name: 'Folio', link: "#/"}];
            switch (toState.name) {
                case "page":
                    $scope.crumbs.push({
                        name: document.getElementById(toParams.page_id).value
                    });
                    break;

                case "edit_post":
                    pageId = toParams.page_id;
                    $scope.crumbs.push({
                        name: document.getElementById(pageId).value,
                        link: "#/" + pageId
                    });
                    $scope.crumbs.push({
                        name: "Post Details"
                    });
                    break;

                case "new_post":
                    pageId = toParams.page_id;
                    $scope.crumbs.push({
                        name: document.getElementById(pageId).value,
                        link: "#/" + pageId
                    });
                    $scope.crumbs.push({
                        name: "New Post"
                    });
                    break;

                case "page_settings":
                    pageId = toParams.page_id;
                    $scope.crumbs.push({
                        name: document.getElementById(pageId).value,
                        link: "#/" + pageId
                    });
                    $scope.crumbs.push({
                        name: "Details"
                    });
                    break;

                case "page_insights":
                    pageId = toParams.page_id;
                    $scope.crumbs.push({
                        name: document.getElementById(pageId).value,
                        link: "#/" + pageId
                    });
                    $scope.crumbs.push({
                        name: "Details",
                        link: "#/" + pageId + "/settings"
                    });
                    $scope.crumbs.push({
                        name: "Insights"
                    });
                    break;

                case "post_insights":
                    pageId = toParams.page_id;
                    $scope.crumbs.push({
                        name: document.getElementById(pageId).value,
                        link: "#/" + pageId
                    });
                    $scope.crumbs.push({
                        name: "Details",
                        link: "#/" + pageId + "/post/" + toParams.post_id
                    });
                    $scope.crumbs.push({
                        name: "Insights"
                    });
                    break;

                default:
                    $scope.crumbs = [{name: 'Folio'}];
            }
        });
    }

    angular
        .module("Folio")
        .controller("BreadCrumbCtrl", ["$scope", "$rootScope", BreadCrumbCtrl]);
}());