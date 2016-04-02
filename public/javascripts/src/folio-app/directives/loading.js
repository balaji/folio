"use strict";

function rdLoading() {
    return {
        restrict: "AE",
        template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
    };
}

angular
    .module("Folio")
    .directive("rdLoading", rdLoading);
