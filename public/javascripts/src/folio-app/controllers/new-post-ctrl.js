angular.module('Folio')
.controller('NewPostCtrl', ['$scope', '$rootScope', '$state', '$cookieStore', 'facebookService',
function($scope, $rootScope, $state, $cookieStore, facebookService) {
  var pageId = $state.params.page_id;
  var paToken= null;
  if (angular.isDefined($cookieStore.get('pageAccessToken'))) {
    paToken = $cookieStore.get('pageAccessToken');
  }

  if(!paToken) {
    $state.go('index');
    return;
  }

  $scope.post = { unpublish: false };
  $scope.disableControls = false;
  $scope.postPost = function() {
    var options = $scope.post;
    console.log(options);
    if((options.message === undefined || options.message == "") && !options.source) {
      $scope.addAlert("This post appears to be blank. Please write something or attach a picture or video", "danger");
      return;
    }

    if(options.source && ["image/png", "image/jpg", "image/jpeg"].indexOf(options.source.type) === -1) {
      $scope.addAlert("Please upload a valid picture.", "danger");
      return;
    }
    $scope.disableControls = true;
    var links = getLink(options.message);
    if(links) {
      options.link = links[0];
    }

    facebookService.post(pageId, paToken, options).then(function(response) {
      $scope.disableControls = false;
      $scope.post = { unpublish: false };
      $scope.addAlert("Posted!!!", "success");
    });
  };

  var getLink = function(message) {
    return /(https?:\/\/[^\s]+)/g.exec(message);
  };
}]);
