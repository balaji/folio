"use strict";

angular.module("Folio")
.service("facebookService", ["$http", function($http) {
  var baseUrl ="https://graph.facebook.com/";
  return {
    getAccessToken: function() {
      var clientId = document.getElementById("appId").value;
      var code = document.getElementById("fbCode").value;
      var redirectUri =  document.getElementById("redirectUri").value;
      return $http({
        method: "GET",
        url: baseUrl + "oauth/access_token?client_id=" + clientId + "&redirect_uri=" + redirectUri + "&code=" + code
      });
    },

    getPageInformation: function(pageId, pageAccessToken) {
      return $http({
        method: "GET",
        url: baseUrl + pageId + "?access_token=" + pageAccessToken + "&fields=about,attire,bio,location,parking,hours,emails,website,description"
      })
    },

    updatePageInformation: function(pageId, pageAccessToken, field, value) {
      return $http({
        method: "POST",
        url: baseUrl + pageId + "?access_token=" + pageAccessToken + "&" + field + "=" + value
      });
    },

    getPosts: function(pageId, pageAccessToken) {
      return $http({
        method: "GET",
        url: baseUrl + pageId + "/feed?fields=id,message,from,to&access_token=" + pageAccessToken
      });
    },

    getUnpublishedPosts: function(pageId, pageAccessToken) {
      return $http({
        method: "GET",
        url: baseUrl + pageId + "/promotable_posts?is_published=false&fields=id,message,from,to&access_token=" + pageAccessToken
      });
    },

    post: function(pageId, pageAccessToken, options) {

      var url;
      var fd = null;
      if(options.source) {
        url = baseUrl + pageId + "/photos?access_token=" + pageAccessToken;
        fd = new FormData();
        fd.append("source", options.source);
      } else {
        url = baseUrl + pageId + "/feed?access_token=" + pageAccessToken;
      }

      if(options.message) {
        url += "&message=" + options.message;
      }

      if(options.link) {
        url += "&link=" + options.link;
      }

      if(options.unpublish) {
        url += "&published=false";
      }

      if(options.picture) {
        url += "&picture=" + options.picture;
      }

      var postInfo = {
        method: "POST",
        url: url
      };
      if(fd) {
        postInfo.data = fd;
        postInfo.headers = { 'Content-Type': undefined };
      }
      return $http(postInfo);
    },

    publishPost: function(postId, pageAccessToken) {
      return $http({
        method: "POST",
        url: baseUrl + postId + "?is_published=true&access_token=" + pageAccessToken
      });
    },

    deletePost: function(postId, paToken) {
      return $http({
        method: 'DELETE',
        url: baseUrl + postId + "?access_token=" + paToken
      });
    },

    getAllPosts: function(pageId, paToken) {
      var batch = [
        { "method" : "GET", "relative_url" : pageId + "/promotable_posts?is_published=false&amp;fields=id,message,created_time"},
        { "method" : "GET", "relative_url" : pageId + "/feed?fields=id,message,updated_time"}];
        return $http({
          method: "POST",
          url: baseUrl,
          data: {"batch" : batch, "access_token" : paToken}
        });
      },

      postInsights: function(postId, paToken) {
        return $http({
          method: 'GET',
          url: baseUrl + postId + '/insights?access_token=' + paToken
        });
      }
    }
  }]);
