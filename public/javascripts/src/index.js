/* jshint browser: true */
(function () {
    "use strict";
    require("./folio-app/module");
    function requireAll(r) {
        r.keys().forEach(r);
    }

    requireAll(require.context("./folio-app/", true, /\.js$/));
}());