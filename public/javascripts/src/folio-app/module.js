require('angular');
require('angular-bootstrap');
require('angular-cookies');
require('angular-ui-router');

angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngCookies'])
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
