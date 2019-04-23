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

	$scope.share = function() {
		// Create new element
		var el = document.createElement('textarea');
		// Set value (string to be copied)
		el.value = str;
		// Set non-editable to avoid focus and move outside of view
		el.setAttribute('readonly', '');
		el.style = {position: 'absolute', left: '-9999px'};
		document.body.appendChild(el);
		// Select text inside element
		el.select();
		// Copy text to clipboard
		document.execCommand('copy');
		// Remove temporary element
		document.body.removeChild(el);

	    /*var d = new Date();
	    var month = d.getMonth() + 1;
	    var date = '' + month + '/' + d.getDate() + '/' + d.getFullYear();
	    //var query = document.getElementById('regionSearch').value;
	    var data = '';

	    for (var i = 0; i < $scope.regions.length; i++) data += $scope.regions[i].woeid + new Array(13 - $scope.regions[i].woeid.toString().length).join(' ') + $scope.regions[i].name + '\n';
	    data = encodeURIComponent(data);

	    //if (query === undefined || query === '') query = 'Worldwide';
	    var email = 'mailto:' + '?subject=' + 'Twitter Analytics Trending Data for ' + date + '&body=' + data;

	    // encode for URL
		$.ajax({ // Dry run test email send
			url: email,
			type: "GET",
			success: function(data) {
				window.open(email, "_self");
			},
			error: function() {
				alert("HI");
			}
		});*/
	}
  }
]);

console.log("regionController.js running");
