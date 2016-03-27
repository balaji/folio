'use strict';

angular.module('Folio')
.service('facebookService', ['$http', function($http) {
  var baseUrl ='https://graph.facebook.com/';
  return {
    getAccessToken: function() {
      var clientId = document.getElementById('appId').value;
      var code = document.getElementById('fbCode').value;
      var redirectUri =  document.getElementById('redirectUri').value;
      return $http({
        method: 'GET',
        url: baseUrl + 'oauth/access_token?client_id=' + clientId + "&redirect_uri=" + redirectUri + "&code=" + code
      });
    },

    getPageInformation: function(pageId, pageAccessToken) {
      return $http({
        method: 'GET',
        url: baseUrl + pageId + '?access_token=' + pageAccessToken + "&fields=about,attire,bio,location,parking,hours,emails,website,description"
      })
    },

    updatePageInformation: function(pageId, pageAccessToken, field, value) {
      return $http({
        method: 'POST',
        url: baseUrl + pageId + "?access_token=" + pageAccessToken + "&" + field + "=" + value
      });
    },

    getPosts: function(pageId, pageAccessToken) {
      return $http({
        method: 'GET',
        url: baseUrl + pageId + "/feed?fields=id,message,from,to&access_token=" + pageAccessToken
      });
    },

    post: function(pageId, pageAccessToken, message, unpublish, link) {
      var url = baseUrl + pageId + "/feed?message=" + message + "&access_token=" + pageAccessToken;

      if(link) {
        url += "&link=" + link;
      }

      if(unpublish) {
        url += "&published=false";
      }

      console.log(url);

      return $http({
        method: 'POST',
        url: url
      });
    }
  }
}]);
