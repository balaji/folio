"use strict";

angular.module("Folio")
.service("facebookService", ["$http", function($http) {
  var baseUrl ="https://graph.facebook.com/";

  var batchRequest = function(paToken, batch) {
    return $http({
      method: "POST",
      url: baseUrl,
      data: {"batch" : batch, "access_token" : paToken}
    });
  };

  return {
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
        var type = (options.source.type.indexOf('image') != -1) ? "photos" : "videos";
        url = baseUrl + pageId + "/"+ type +"?access_token=" + pageAccessToken;
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

      if(options.scheduled_publish_time) {
        url += "&scheduled_publish_time=" + options.scheduled_publish_time;
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

    batchRequest: function(paToken, batch) {
      return batchRequest(paToken, batch);
    },

    getAllPosts: function(pageId, paToken) {
      var batch = [
        { "method" : "GET", "relative_url" : pageId + "/promotable_posts?is_published=false&amp;fields=id,message,created_time,status_type&limit=10"},
        { "method" : "GET", "relative_url" : pageId + "/posts?fields=id,message,updated_time,status_type&limit=10"},
        { "method" : "GET", "relative_url" : pageId + "/insights"}
      ];
      return batchRequest(paToken, batch);
    },

    postInsights: function(postId, paToken) {
      return $http({
        method: 'GET',
        url: baseUrl + postId + '/insights?access_token=' + paToken
      });
    }
  };
}]);
