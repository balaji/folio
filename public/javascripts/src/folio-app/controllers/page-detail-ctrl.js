angular.module('Folio')
.controller('PageDetailCtrl', ['$scope', '$rootScope', '$state', '$http', '$cookieStore', 'facebookService',
function($scope, $rootScope, $state, $http, $cookieStore, facebookService) {
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
      var unpublished = JSON.parse(response.data[0].body);
      var published = JSON.parse(response.data[1].body);
      $scope.unPublishedPosts = addType(unpublished, "UN_PUB");
      $scope.publishedPosts = addType(published, "PUB");
    });
  };

  var addType = function(posts, type_name) {
    posts.type = type_name;
    return posts;
  };

  $scope.loadMore = function(url, flag, dir) {
    var prevPubPaging, prevUnPubPaging;
    if(flag === "PUB") {
      prevPubPaging = $scope.publishedPosts.paging;
      $scope.publishedPosts = null;
    } else {
      prevUnPubPaging = $scope.unPublishedPosts.paging;
      $scope.unPublishedPosts = null;
    }
    $http.get(url).then(function(response) {
      console.log(response.data);
      if(flag === "PUB") {
        $scope.publishedPosts = addType(response.data, "PUB");
        if(!$scope.publishedPosts.paging) {
          if(dir === 'prev') $scope.publishedPosts.paging = {next: prevPubPaging.next};
          if(dir === 'next') $scope.publishedPosts.paging = {previous: prevPubPaging.previous};
        }
      } else {
        $scope.unPublishedPosts = addType(response.data, "UN_PUB");
        if(!$scope.unPublishedPosts.paging) $scope.unPublishedPosts.paging = prevUnPubPaging;
      }
    });
  };

  var countPosts = function() {
    $scope.totalPosts = 0;
    $scope.totalUnPosts = 0;
    $scope.tpLoading = true;
    $scope.tuLoading = true;
    $http.get("https://graph.facebook.com/" + pageId +
    "/posts?limit=100&fields=id&access_token=" + paToken).then(function(response) {
      countMore(response.data, "PUB");
    });
    $http.get("https://graph.facebook.com/" + pageId +
    "/promotable_posts?limit=100&fields=id&is_published=false&access_token="+paToken).then(function(response) {
      countMore(response.data, "UN_PUB");
    });
  };

  var countMore = function(posts, flag) {
    if(flag === "PUB") $scope.totalPosts += posts.data.length;
    else $scope.totalUnPosts += posts.data.length;
    if(posts.data.length === 100) {
      $http.get(posts.paging.next).then(function(response) {
        countMore(response.data, flag);
      });
    } else {
      if (flag === "PUB") $scope.tpLoading = false;
      else $scope.tuLoading = false;
    }
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

  countPosts();
  loadAllPosts();
}]);
