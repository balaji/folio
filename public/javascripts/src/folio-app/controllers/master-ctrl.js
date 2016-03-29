'use strict';
angular.module('Folio')
.controller('MasterCtrl', ['$scope', '$state', 'facebookService', 'jQueryService', '$cookieStore',
function MasterCtrl($scope, $state, facebookService, $, $cookieStore) {
  var mobileView = 992;

  var batch = [];
  var paToken = null;
  $(".fb-pages").each(function(i, element) {
    paToken = $(element).attr("data-page-token");
    batch.push({ "method" : "GET", "relative_url" : element.id +
    "?access_token=" + paToken +
    "&fields=about,name,access_token" })
  });

  if(batch.length !== 0) {
    facebookService.batchRequest(paToken, batch).then(function(response) {
      $scope.pages = [];
      $(response.data).each(function(i, data) {
        $scope.pages.push(JSON.parse(data.body));
      })
    });
  } else {
    $scope.pages = [];
  }

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
    $cookieStore.put('pageAccessToken', pageAccessToken);
    $state.go('page', {page_id: pageId});
  };

  window.onresize = function() {
    $scope.$apply();
  };
}]);
