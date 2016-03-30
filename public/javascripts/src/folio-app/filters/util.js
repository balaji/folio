angular.module('Folio')
		.filter('isEmpty', function () {
			var bar;
			return function (obj) {
				if (typeof obj !== 'object') return false;
				for (bar in obj) {
					if (obj.hasOwnProperty(bar)) {
						return false;
					}
				}
				return true;
			};
		})
		.filter('isNumber', function () {
			return function (obj) {
				return Number.isInteger(obj);
			}
		});