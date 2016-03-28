angular.module('Folio')
.controller('PageDetailCtrl', ['$scope', '$rootScope', '$state', '$cookieStore', 'facebookService',
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

  var loadAllPosts = function() {
    facebookService.getAllPosts(pageId, paToken).then(function(response) {
        $scope.unPublishedPosts = JSON.parse(response.data[0].body).data;
        $scope.publishedPosts = JSON.parse(response.data[1].body).data;
    });
  };

  $scope.publish = function(postId) {
    $scope.unPublishedPosts = null;
    $scope.publishedPosts = null;
    facebookService.publishPost(postId, paToken).then(function(response) {
      loadAllPosts();
    });
  };

  $scope.delete = function(postId) {
    $scope.unPublishedPosts = null;
    $scope.publishedPosts = null;
    facebookService.deletePost(postId, paToken).then(function(response) {
      loadAllPosts();
    });
  };

  $scope.newPost = function() {
    $state.go('new_post', {page_id: pageId});
  };

  $scope.settings = function() {
    $state.go('page_settings', {page_id: pageId});
  };

  loadAllPosts();
}]);
