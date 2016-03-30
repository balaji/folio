'use strict';

function NewPostCtrl($scope, $rootScope, $state, $cookieStore, facebookService) {
    var pageId = $state.params.page_id;
    var paToken = null;
    if (angular.isDefined($cookieStore.get('pageAccessToken'))) {
        paToken = $cookieStore.get('pageAccessToken');
    }

    if (!paToken) {
        $state.go('index');
        return;
    }

    $scope.post = {unpublish: false};
    $scope.disableControls = false;
    $scope.postInfo = {schedulePublish: false};
    $scope.postPost = function () {
        $rootScope.clearAlerts();
        var options = $scope.post;
        if ((options.message === undefined || options.message == "") && !options.source) {
            $rootScope.addAlert("This post appears to be blank. Please write something or attach a picture or video", "danger");
            return;
        }

        if (options.source && ["image/png", "image/jpg", "image/jpeg",
                "video/mp4", "video/webm", "video/ogg"].indexOf(options.source.type) === -1) {
            $rootScope.addAlert("Please upload a valid picture or video.", "danger");
            return;
        }
        var links = getLink(options.message);
        if (links) {
            options.link = links[0];
        }

        if (options.unpublish && $scope.postInfo.schedulePublish) {
            if ($scope.postInfo.date === undefined || $scope.postInfo.date === '') {
                $rootScope.addAlert("Please select a valid date to schedule publishing.", "danger");
                return;
            }

            var chosenDate = new Date($scope.postInfo.date)
            var sixMonthsFromNow = new Date();
            var tenMinutesFromNow = new Date();
            sixMonthsFromNow.setMonth(chosenDate.getMonth() + 6);
            tenMinutesFromNow.setMinutes(chosenDate.getMinutes() + 10);

            if (chosenDate.getTime() < tenMinutesFromNow.getTime() || chosenDate.getTime() > sixMonthsFromNow.getTime()) {
                $rootScope.addAlert("Please select a date between 10 mintues to 6 months from now.", "danger");
                return;
            }

            options.scheduled_publish_time = (chosenDate.getTime() / 1000).toFixed(0);
        }

        $scope.disableControls = true;
        $rootScope.addAlert("Creating the post, please wait...", "success");
        facebookService.post(pageId, paToken, options).then(function (response) {
            $scope.disableControls = false;
            $scope.post = {unpublish: false};
            $rootScope.addAlert("Posted!!!", "success");
        });
    };

    var getLink = function (message) {
        return /(https?:\/\/[^\s]+)/g.exec(message);
    };
}

angular
    .module('Folio')
    .controller('NewPostCtrl', ['$scope', '$rootScope', '$state', '$cookieStore', 'facebookService', NewPostCtrl]);
