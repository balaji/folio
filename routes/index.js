/* jshint node: true */
(function () {
    "use strict";
    var express = require("express");
    var FB = require("fb");
    var config = require("../config");
    var router = express.Router();

    /* GET Login page. */
    router.get("/", function (req, res, next) {
        if (req.cookies.appState === "loggedIn") {
            res.redirect("/pages");
        } else {
            res.render("index", {title: "Home"});
        }
    });

    router.get("/logout", function (req, res, next) {
        req.session.destroy(function () {
            req.session = null;
            res.cookie("appState", "loggedOut", {maxAge: 900000, httpOnly: false});
            res.render("index", {title: "Home"});
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

            // var expires = data.expires ? data.expires : 0;
            req.session.llToken = data.access_token;
            res.cookie("appState", "loggedIn", {maxAge: 900000, httpOnly: false});
            res.redirect("/pages");
        });
    });

    module.exports = router;
}());
