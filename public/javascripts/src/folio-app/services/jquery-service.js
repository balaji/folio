"use strict";

angular.module("Folio")
.service("jQueryService", [function() {
  return require('../../../components/jquery/dist/jquery.min.js');
}]);
