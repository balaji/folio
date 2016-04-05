(function () {
    "use strict";

    function LoginCtrl($scope, facebookService, FB, Util, $uibModal) {

        function checkStatusChange(response) {
            if (response.status === "connected") {
                facebookService.hasPermission(response.authResponse.accessToken, "manage_pages").then(function (hasPermission) {
                    if (hasPermission) {
                        Util.post("/", {token: response.authResponse.accessToken});
                    } else {
                        $uibModal.open({
                            template: '<div class="modal-header">Note</div>' +
                            '<div class="modal-body">Access to managing pages is vital for using this app</div>' +
                            '<div class="modal-footer"><button ng-click="ok()" class="btn btn-warning">OK</button></div>',

                            controller: function($scope, $uibModalInstance) {
                                $scope.ok = function() {
                                    $uibModalInstance.dismiss();
                                };
                            }
                        });
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
        .controller("LoginCtrl", ["$scope", "facebookService", "facebookSDK", "Util", "$uibModal", LoginCtrl]);
})();