(function () {
    "use strict";

    function jQueryService() {
        return require("../../../components/jquery/dist/jquery.min.js");
    }

    angular
        .module("Folio")
        .service("jQueryService", [jQueryService]);
}());
