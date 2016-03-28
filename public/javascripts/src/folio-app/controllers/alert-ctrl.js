angular
.module('Folio')
.controller('AlertsCtrl', ['$rootScope', AlertsCtrl]);

function AlertsCtrl($rootScope) {
  $rootScope.alerts = [];

  $rootScope.addAlert = function(alertMessage, alertType) {
    $rootScope.alerts.push({
      msg: alertMessage,
      type: alertType
    });
  };

  $rootScope.closeAlert = function(index) {
    $rootScope.alerts.splice(index, 1);
  };
}
