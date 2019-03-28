angular.module('regions').factory('Regions', function() {
	var regions;
	$.ajax({
		url: "/get_regions",
		type: "GET",
		data: {},
		async: false,
		success: function(data){
			regions = data;
		}
	});

	console.log(regions);

	return regions;
});
console.log("regionFactory.js running");
