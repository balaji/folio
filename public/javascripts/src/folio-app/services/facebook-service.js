/* jshint browser: true */
(function () {
    "use strict";

    function facebookService($http) {
        var baseUrl = "https://graph.facebook.com/v2.5/", batchRequest;
        batchRequest = function (paToken, batch) {
            return $http({
                method: "POST",
                url: baseUrl,
                data: {"batch": batch, "access_token": paToken}
            });
        };

        return {
            post: function (pageId, paToken, options) {

                var url, fd, type, postInfo = null;
                if (options.source) {
                    type = (options.source.type.indexOf("image") !== -1) ? "photos" : "videos";
                    url = baseUrl + pageId + "/" + type + "?access_token=" + paToken;
                    fd = new FormData();
                    fd.append("source", options.source);
                } else {
                    url = baseUrl + pageId + "/feed?access_token=" + paToken;
                }

                if (options.message) {
                    url += "&message=" + options.message;
                }

                if (options.link) {
                    url += "&link=" + options.link;
                }

                if (options.unpublish) {
                    url += "&published=false";
                }

                if (options.picture) {
                    url += "&picture=" + options.picture;
                }

                if (options.scheduled_publish_time) {
                    url += "&scheduled_publish_time=" + options.scheduled_publish_time;
                }

                postInfo = {
                    method: "POST",
                    url: url
                };

                if (fd) {
                    postInfo.data = fd;
                    postInfo.headers = {"Content-Type": undefined};
                }
                return $http(postInfo);
            },

            publishPost: function (postId, paToken) {
                return $http({
                    method: "POST",
                    url: baseUrl + postId + "?is_published=true&access_token=" + paToken
                });
            },

            deletePost: function (postId, paToken) {
                return $http({
                    method: "DELETE",
                    url: baseUrl + postId + "?access_token=" + paToken
                });
            },

            batchRequest: function (paToken, batch) {
                return batchRequest(paToken, batch);
            },
            
            getLikes: function(postId, paToken) {
                return $http({
                    method: "GET",
                    url: baseUrl + postId + "/likes?access_token=" + paToken
                });
            },

            getPostComments: function(postId, paToken) {
                return $http({
                    method: "GET",
                    url: baseUrl + postId + "/comments?access_token=" + paToken
                });
            },

            getPostDetails: function (postId, paToken) {
                var batch = [
                    {
                        "method": "GET",
                        "relative_url": postId + "?access_token=" + paToken + "&fields=from,is_published,link,message,updated_time,picture,name,description,source,type,shares,caption,status_type"
                    },
                    {
                        "method": "GET",
                        "relative_url": postId + "/likes?summary=true&access_token=" + paToken
                    },
                    {
                        "method": "GET",
                        "relative_url": postId + "/comments?summary=true&filter=toplevel&access_token=" + paToken
                    },
                    {
                        "method": "GET",
                        "relative_url": postId + "/attachments?access_token=" + paToken
                    }
                ];
                return batchRequest(paToken, batch);
            },

            getPageDetails: function (pageId, paToken) {
                var batch = [
                    {
                        "method": "GET",
                        "relative_url": pageId + "?access_token=" + paToken + "&fields=about,bio,location,hours,emails,name,category,likes,website,description"
                    },
                    {
                        "method": "GET",
                        "relative_url": pageId + "/albums?access_token=" + paToken
                    }
                ];
                return batchRequest(paToken, batch);
            },
            
            getAllPosts: function (pageId, paToken) {
                var batch = [
                    {
                        "method": "GET",
                        "relative_url": pageId + "/promotable_posts?is_published=false&amp;fields=id,message,created_time,status_type,icon&limit=10"
                    },
                    {
                        "method": "GET",
                        "relative_url": pageId + "/posts?fields=id,message,updated_time,status_type,icon&limit=10"
                    }
                ];
                return batchRequest(paToken, batch);
            },

            insights: function (objectId, paToken) {
                return $http({
                    method: "GET",
                    url: baseUrl + objectId + "/insights?access_token=" + paToken
                });
            }
        };
    }

    angular
        .module("Folio")
        .service("facebookService", ["$http", facebookService]);
}());
