/* jshint node: true */
(function () {
    "use strict";
    var express = require("express");
    var FB = require("fb");
    var config = require("../config");
    var router = express.Router();

    /* GET Login page. */
    router.get("/", function (req, res, next) {
        res.render("index", {title: "Home", config: config});
    });

    router.get("/logout", function (req, res, next) {
        req.session.destroy(function () {
            req.session = null;
            res.clearCookie("pageAccessToken");
            res.clearCookie("webAccessToken");  
            res.render("index", {title: "Home", config: config});
        });
    });

    /* Sets up FB API with access token and redirects to /pages. */
    router.post("/", function (req, res, next) {
        var accessToken = req.body.token;

        //Fetching Long lived token. lives for 60 days.
        FB.api("oauth/access_token", {
            client_id: config.appId,
            client_secret: process.env.APP_SECRET,
            grant_type: "fb_exchange_token",
            fb_exchange_token: accessToken
        }, function (data) {
            if (!data || data.error) {
                console.log(!data ? 'error occurred' : data.error);
                return;
            }

            req.session.llToken = data.access_token;
            res.redirect("/pages");
        });
    });

    module.exports = router;
}());
