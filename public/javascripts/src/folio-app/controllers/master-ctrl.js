'use strict';
angular.module('Folio')
.controller('MasterCtrl', ['$scope', '$rootScope', '$state', 'facebookService', '$cookieStore',
function MasterCtrl($scope, $rootScope, $state, facebookService, $cookieStore) {

  // facebookService.getAccessToken().then(function(response) {
  //   $cookieStore.put('accessToken', response.data.access_token);
  // });
  /**
  * Sidebar Toggle & Cookie Control
  */
  var mobileView = 992;

  $scope.getWidth = function() {
    return window.innerWidth;
  };

  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
    if (newValue >= mobileView) {
      if (angular.isDefined($cookieStore.get('toggle'))) {
        $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
      } else {
        $scope.toggle = true;
      }
    } else {
      $scope.toggle = false;
    }
  });

  $scope.toggleSidebar = function() {
    $scope.toggle = !$scope.toggle;
    $cookieStore.put('toggle', $scope.toggle);
  };

  $scope.loadPage = function($event) {
    var $element = angular.element($event.currentTarget)[0];
    var pageId = $element.attributes['data-page-id'].value;
    var pageAccessToken = $element.attributes['data-page-token'].value;
    // $rootScope.pageAccessToken = pageAccessToken;
    $cookieStore.put('pageAccessToken', pageAccessToken);
    $state.go('page', {page_id: pageId});
  };

  window.onresize = function() {
    $scope.$apply();
  };
}]);
