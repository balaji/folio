angular.module('Folio')
.controller('PageDetailCtrl', ['$scope', '$rootScope', '$state', '$cookieStore', 'facebookService',
function($scope, $rootScope, $state, $cookieStore, facebookService) {
  var pageId = $state.params.page_id;
  var paToken = $rootScope.pageAccessToken;

  if(!paToken) {
    $state.go('index');
    return;
  }
  // facebookService.getPageInformation($state.params.page_id, $rootScope.pageAccessToken).then(function(response) {
  //   console.log(response);
  // });

  // facebookService.updatePageInformation(pageId, paToken, "description", "This is an updated description").then(function(response) {
  //   console.log(response);
  // });
  //
  // facebookService.post(pageId, paToken, 'What a wonderful world!',
  // true, "http://www.espncricinfo.com/icc-world-twenty20-2016/content/story/991461.html").then(function(response) {
  //   console.log(response);
  // });

  facebookService.getPosts(pageId, paToken).then(function(response) {
    console.log(response);
  })
}]);
