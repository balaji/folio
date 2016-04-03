(function () {

    "use strict";
    
    var isEmpty = function(obj) {
        var property;
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
    
    angular
        .module("Folio")
        .filter("isEmpty", function () {
            return function (obj) {
                return isEmpty(obj);
            };
        })
        .filter("isNumber", function () {
            return function (obj) {
                return Number.isInteger(obj);
            };
        });
}());