/**
* Alerts Controller
*/
angular
.module('Folio')
.controller('AlertsCtrl', ['$scope', AlertsCtrl]);

function AlertsCtrl($scope) {
  $scope.alerts = [];

  $scope.addAlert = function(alertType, alertMessage) {
    $scope.alerts.push({
      msg: alertMessage,
      type: alertType
    });
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
}
