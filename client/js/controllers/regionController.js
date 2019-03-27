angular.module('regions').controller('RegionsController', ['$scope', 'Regions', 
  function($scope, Regions) {
    $scope.regions = Regions;
    $scope.filteredList = undefined;
    console.log("function in controller running");

    /*
    //get all the regions
    Regions.getAll().then(function(response) {
      $scope.Regions = response.data;
    }, function(error) {
      console.log('Unable to retrieve regions:', error);
    });
    */



  }
]);

console.log("regionController.js running");