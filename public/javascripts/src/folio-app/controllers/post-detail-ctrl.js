angular.module('Folio')
		.controller('PostDetailCtrl', ['$scope', '$state', '$cookieStore', 'facebookService', PostDetailCtrl]);

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

	facebookService.postInsights(postId, paToken).then(function (response) {
		$scope.postInsights = response.data;
		console.log(response.data);
	});
}
