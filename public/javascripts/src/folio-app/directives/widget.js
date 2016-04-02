(function () {

    "use strict";
    function rdWidget() {
        return {
            transclude: true,
            template: '<div class="widget" ng-transclude></div>',
            restrict: "EA"
        };
    }

    angular
        .module("Folio")
        .directive("rdWidget", rdWidget);
}());
