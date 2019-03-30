angular.module('regions').controller('RegionsController', ['$scope', 'Regions',
  function($scope, Regions) {
    $scope.regions = Regions;
    $scope.filteredList = undefined;
    console.log("function in controller running");

	$scope.WOEID_clicked = function(woeid, name) {
		update_chart(woeid, name);
	}
  }
]);

console.log("regionController.js running");
