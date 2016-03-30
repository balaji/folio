angular
		.module('Folio')
		.controller('BreadCrumbCtrl', ['$scope', '$rootScope', BreadCrumbCtrl]);

function BreadCrumbCtrl($scope, $rootScope) {
	$scope.crumbsLink = null;

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		$scope.subCrumbs = null;
		switch (toState.name) {
			case "page":
				$scope.crumbs = document.getElementById(toParams.page_id).value;
				$scope.crumbsLink = "#/" + toParams.page_id;
				break;

			case "edit_post":
				var pageId = toParams.post_id.split('_')[0]
				$scope.crumbs = document.getElementById(pageId).value;
				$scope.crumbsLink = '#/' + pageId;
				$scope.subCrumbs = 'Post Details';
				break;

			case "new_post":
				var pageId = toParams.page_id;
				$scope.crumbs = document.getElementById(pageId).value;
				$scope.crumbsLink = '#/' + pageId;
				$scope.subCrumbs = 'New Post';
				break;

			case "page_settings":
				var pageId = toParams.page_id;
				$scope.crumbs = document.getElementById(pageId).value;
				$scope.crumbsLink = '#/' + pageId;
				$scope.subCrumbs = 'Page Details';
				break;

			default:
				$scope.crumbsLink = null;
		}
	});
}
