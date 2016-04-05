(function () {
    "use strict";
    function facebookSDK($window) {
        $window.FB.init({
            appId: document.getElementById("appId").value,
            xfbml: false, version: "v2.5",
            status: true, cookie: true
        });
        return $window.FB;
    }

    angular
        .module("Folio")
        .service("facebookSDK", ["$window", facebookSDK]);
})();