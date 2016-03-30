"use strict";

angular
		.module("Folio")
		.service("jQueryService", [jQueryService]);

function jQueryService() {
	return require('../../../components/jquery/dist/jquery.min.js');
}
