sap.ui.define([], function() {
	"use strict";

	return {
		forecastsLabel: function(sValue) {
			var date = new Date(sValue);
			return date.getMonth() + '-' + date.getDate();
		}
	};
});