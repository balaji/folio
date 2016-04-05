(function () {
    "use strict";
    function Util($) {
        return {
            post: function (path, parameters) {
                var form = $("<form></form>");

                form.attr("method", "post");
                form.attr("action", path);

                $.each(parameters, function (key, value) {
                    var field = $("<input>");

                    field.attr("type", "hidden");
                    field.attr("name", key);
                    field.attr("value", value);

                    form.append(field);
                });

                // The form needs to be a part of the document in order for us to be able to submit it.
                $(document.body).append(form);
                form.submit();
            },
            
            readCookie: function (name) {
                var docCookies = document.cookie.split("; ");
                var cookies = {};

                for (var i = docCookies.length - 1; i >= 0; i--) {
                    var cookieSplit = docCookies[i].split("=");
                    cookies[cookieSplit[0]] = cookieSplit[1];
                }
                return cookies[name];
            }
        };
    }

    angular
        .module("Folio")
        .service("Util", ["jQueryService", Util]);
})();