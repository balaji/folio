require('../../components/angular/angular.min');
require('../../components/angular-bootstrap/ui-bootstrap-tpls.min');
require('../../components/angular-cookies/angular-cookies.min');
require('../../components/angular-ui-router/release/angular-ui-router.min');

angular.module('Folio', ['ui.bootstrap', 'ui.router', 'ngCookies'])
.config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  // For unmatched routes
  $urlRouterProvider.otherwise('/');
  // Application routes
  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'templates/dashboard.html'
  })
  .state('tables', {
    url: '/tables',
    templateUrl: 'templates/tables.html'
  });
}]);
