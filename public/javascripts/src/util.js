"use strict";

var $ = require('../components/jquery/dist/jquery.min.js');

exports.post = function (path, parameters) {
    var form = $('<form></form>');

    form.attr("method", "post");
    form.attr("action", path);

    $.each(parameters, function (key, value) {
        var field = $('<input>');

        field.attr("type", "hidden");
        field.attr("name", key);
        field.attr("value", value);

        form.append(field);
    });

    // The form needs to be a part of the document in
    // order for us to be able to submit it.
    $(document.body).append(form);
    form.submit();
};

var cookies;
exports.readCookie = function (name) {
    if (cookies) {
        return cookies[name];
    }

    var c = document.cookie.split('; ');
    cookies = {};

    for (var i = c.length - 1; i >= 0; i--) {
        var C = c[i].split('=');
        cookies[C[0]] = C[1];
    }

    return cookies[name];
};
