(function () {
    "use strict";

    function LoginCtrl($scope, facebookService, FB, Util) {

        function checkStatusChange(response) {
            console.log(response);
            if (response.status === "connected") {
                facebookService.hasPermission(response.authResponse.accessToken, "manage_pages").then(function (hasPermission) {
                   if(hasPermission) {
                       Util.post("/", {token: response.authResponse.accessToken});
                   } else {
                       alert("Access to managing pages is vital for using this app");
                   }
                });
            }
        }

        FB.getLoginStatus(function (response) {
            checkStatusChange(response);
        });

        $scope.login = function () {
            FB.login(function (response) {
                checkStatusChange(response);
            }, {scope: "manage_pages,publish_pages,read_insights"});
        };
    }

    angular
        .module("Folio")
        .controller("LoginCtrl", ["$scope", "facebookService", "facebookSDK", "Util", LoginCtrl]);
})();