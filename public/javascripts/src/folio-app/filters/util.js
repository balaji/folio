(function () {

    "use strict";
    angular
        .module("Folio")
        .filter("isEmpty", function () {
            var property;
            return function (obj) {
                if (typeof obj !== "object") {
                    return false;
                }
                for (property in obj) {
                    if (obj.hasOwnProperty(property)) {
                        return false;
                    }
                }
                return true;
            };
        })
        .filter("isNumber", function () {
            return function (obj) {
                return Number.isInteger(obj);
            };
        });
}());