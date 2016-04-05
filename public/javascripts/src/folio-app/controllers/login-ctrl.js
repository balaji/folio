(function () {
    "use strict";

    function LoginCtrl($scope, FB, Util) {

        function checkStatusChange(response) {
            if (response.status === "connected") {
                Util.post("/", {token: response.authResponse.accessToken});
            }
        }

        FB.getLoginStatus(function (response) {
            checkStatusChange(response);
        });

        $scope.login = function () {
            console.log("FFS");
            FB.login(function (response) {
                checkStatusChange(response);
            }, {scope: "manage_pages,publish_pages,read_insights"});
        };
    }

    angular
        .module("Folio")
        .controller("LoginCtrl", ["$scope", "facebookSDK", "Util", LoginCtrl]);
})();