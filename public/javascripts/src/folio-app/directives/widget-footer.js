(function () {
    "use strict";
    function rdWidgetFooter() {
        return {
            requires: "^rdWidget",
            transclude: true,
            template: '<div class="widget-footer" ng-transclude></div>',
            restrict: "E"
        };
    }

    angular
        .module("Folio")
        .directive("rdWidgetFooter", rdWidgetFooter);
}());
