'use strict';
function PostDetailCtrl($scope, $state, $cookieStore, facebookService) {
    var postId = $state.params.post_id;
    var paToken = null;
    if (angular.isDefined($cookieStore.get('pageAccessToken'))) {
        paToken = $cookieStore.get('pageAccessToken');
    }

    if (!paToken) {
        $state.go('index');
        return;
    }

    facebookService.getPostDetails(postId, paToken).then(function (response) {
        $scope.postDetails = JSON.parse(response.data[0].body);
        $scope.postInsights = JSON.parse(response.data[1].body);
        console.log($scope.postDetails);
        console.log($scope.postInsights);
    });
}

angular.module('Folio')
    .controller('PostDetailCtrl', ['$scope', '$state', '$cookieStore', 'facebookService', PostDetailCtrl]);
