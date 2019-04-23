var currentRegion;

angular.module('regions').controller('RegionsController', ['$scope', 'Regions',
  function($scope, Regions) {
    $scope.regions = Regions;
    $scope.filteredList = undefined;
    console.log("function in controller running");

	$scope.WOEID_clicked = function(woeid, name, $event) {
		update_chart(woeid, name);

		/*Highlight clicked region*/
		if (currentRegion != null){
			currentRegion.classList.remove('clicked');
		}
		var region = $event.target.parentNode;
		region.classList.add('clicked');
		currentRegion = region;
		//console.log(region.className);
	}
  }
]);

console.log("regionController.js running");
