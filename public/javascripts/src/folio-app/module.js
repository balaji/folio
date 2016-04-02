"use strict";
require("../../components/angular/angular.min");
require("../../components/angular-bootstrap/ui-bootstrap.min");
require("../../components/angular-bootstrap/ui-bootstrap-tpls.min");
require("../../components/angular-cookies/angular-cookies.min");
require("../../components/angular-ui-router/release/angular-ui-router.min");
require("../../components/adm-dtp/dist/ADM-dateTimePicker.min");

function config($stateProvider, $urlRouterProvider, ADMdtpProvider) {
    ADMdtpProvider.setOptions({
        calType: "gregorian",
        format: "MM/DD/YYYY hh:mm",
        multiple: false
    });

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("index", {
            url: "/",
            templateUrl: "templates/dashboard.html"
        })
        .state("page", {
            url: "/:page_id",
            templateUrl: "templates/page-summary.html"
        })
        .state("page_settings", {
            url: "/:page_id/settings",
            templateUrl: "templates/page-detail.html"
        })
        .state("edit_post", {
            url: "/post/:post_id",
            templateUrl: "templates/post-detail.html"
        })
        .state("new_post", {
            url: "/:page_id/post/new",
            templateUrl: "templates/new-post.html"
        });
}

angular.module("Folio", ["ui.bootstrap", "ui.router", "ngCookies", "ADM-dateTimePicker"])
    .config(["$stateProvider", "$urlRouterProvider", "ADMdtpProvider", config]);
