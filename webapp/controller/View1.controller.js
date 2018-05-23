sap.ui.define([
	"hackingdays/model/formatter",
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator'
], function(formatter, Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	var timerId = null;
	var curValueCounter = 0;
	var MAXVALUECOUNTER = 310;

	var getDataUrl = "https://trialhanas0011348693trial.hanatrial.ondemand.com/hack/getData.xsjs";
	var deleteDataUrl = "https://trialhanas0011348693trial.hanatrial.ondemand.com/hack/deleteData.xsjs";
	var insertOneRow = "https://trialhanas0011348693trial.hanatrial.ondemand.com/hack/insertOneRow.xsjs";
	var insertAllRows = "https://trialhanas0011348693trial.hanatrial.ondemand.com/hack/insertAllRows.xsjs";
	
	return Controller.extend("hackingdays.controller.View1", {
		
		formatter: formatter,
		
		onInit: function() {
			this.getView().setModel(new JSONModel({
				isHeaderVisible: false
				// forecast: {
				// 	value:30,
				// 	state: "10,
				// 	threshold_warning: 20,
				// 	threshold_critical: 90
				// },
			}));
		},

		onStart: function() {

			$.getJSON(deleteDataUrl,
				function(response) {

						clearInterval(timerId);
						curValueCounter = 0;
						
						timerId = setInterval(
							function(){
								this.nextTick();
							}.bind(this),
							parseInt(this.byId("interval").getValue(), 10) * 1
						);

				}.bind(this)
			);
		},

		onInsertAll: function() {
			$.getJSON(insertAllRows,
				function(response) {}
			);
		},

		nextTick: function() {
			curValueCounter++;
			this.getView().getModel().setProperty('/curValueCounter', curValueCounter); 
			
			if (curValueCounter > MAXVALUECOUNTER) {
				clearInterval(timerId);
			}

			$.getJSON(insertOneRow,
				function(response) {
					this.loadTableData();
					//this.loadForecast();
				}.bind(this)
			);
		},

		loadTableData: function() {
			$.getJSON(getDataUrl,
				function(response) {
					response.sensors.forEach(function(item) {
						var lastVal = 0;
						
						item.points = item.values.map(function(it, index) {
							
							item.lastVal = it.value;
							
							return {
								x: index,
								y: it.value
							};
						});
						
					});
					this.getView().getModel().setProperty('/sensors', response.sensors);
				}.bind(this)
			);
		},

		loadForecast: function(id) {
			id = parseInt(id, 10) + 4;
			
			$.ajax({
				url: "/destinations/ps/forecast/" + id,
				type: "get",
				contentType: "application/json",
				dataType: "json",
				error: function(response) {
					console.log(response);
				},
				success: function(response) {
					response.forecasts = response.forecasts.map(function(item){
						return {
							date: item.date,
							color: item.realValue > 38 ? "Error" : "Good",
							realValue: item.realValue
						}
					});
					// Critical
					// Good
					this.getView().getModel().setProperty('/forecasts', response.forecasts);
					this.getView().getModel().setProperty('/isHeaderVisible', true);
				}.bind(this)
			});
		},

		onUpdateForecast: function() {
			this.loadForecast(1);
		},

		onSearch: function(oEvent) {
			if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed.
				// This is visible if you select any master list item.
				// In this case no new search is triggered, we only
				// refresh the list binding.
				this.onRefresh()
			} else {
				var oTableSearchState = []
				var sQuery = oEvent.getParameter('query')

				if (sQuery && sQuery.length > 0) {
					oTableSearchState = [
						new Filter('name', FilterOperator.Contains, sQuery)
					]
				}

				var oTable = this.byId('table'),
					oViewModel = this.getView().getModel('worklistView');

				oTable.getBinding('items').filter(oTableSearchState, 'Application');

				// changes the noDataText of the list in case there are no filter results
				if (oTableSearchState.length !== 0) {
					oViewModel.setProperty(
						'/tableNoDataText',
						this.getResourceBundle().getText('worklistNoDataWithSearchText')
					)
				}

			}
		},
		
        onSelectionChange: function(oEvent) {
          var oSelectedItem = oEvent.getParameter("listItem");
          var oModel = oSelectedItem.getBindingContext().getObject();
          this.loadForecast(oModel.id);
        }
	});
});