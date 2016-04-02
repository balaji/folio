/* jshint browser: true */
(function () {
    "use strict";
    window.folioFbLogin = require("./facebook-login");

    require("./folio-app/module");
    function requireAll(r) {
        r.keys().forEach(r);
    }

    requireAll(require.context("./folio-app/", true, /\.js$/));
}());