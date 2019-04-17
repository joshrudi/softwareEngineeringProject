// Test 1, get a list of all possible WOEID's
$.ajax({
	url: "/get_regions",
	type: "GET",
	async: false,
	data: {
	},
	success: function(data) {
		console.log("Successfully received " + data.length + " regions");
	},
	error: function(err) {
		console.log(err.statusText);
		console.error("Could not get list of all regions");
	}
});

// Test 2, create a listing with user_id 555
$.ajax({
	url: "/update_listing",
	type: "POST",
	async: false,
	data: {
		user_id: 555
	},
	success: function(data) {
		console.log("Successfully created user");
	},
	error: function() {
		console.error("Could not create new user");
	}
});

// Test 3, find information about the user we just created
$.ajax({
	url: "/find_listing",
	type: "POST",
	async: false,
	data: {
		user_id: 555
	},
	success: function(data) {
		console.log("Found user with this information:\n" + data);
	},
	error: function() {
		console.error("Could not find user");
	}
});

// Test 4, search for users with the name Paul
$.ajax({
	url: "/search_user",
	type: "POST",
	async: false,
	data: {
		query: "Paul"
	},
	success: function(data) {
		console.log("Found " + data.length + " twitter users with Paul in their name / handle");
	},
	error: function() {
		console.error("Error with finding users");
	}
});

// Test 5, try to get information from a user that does not exist
$.ajax({
	url: "/find_listing",
	type: "POST",
	async: false,
	data: {
		user_id: 1234
	},
	success: function(data) {
		console.error("Found user with this information:\n" + data);
	},
	error: function() {
		console.log("Could not find user");
	}
});

// Test 6, try to add an empty user
$.ajax({
	url: "/update_listing",
	type: "POST",
	async: false,
	data: {},
	success: function(data) {
		console.error("Successfully created user");
	},
	error: function() {
		console.log("Could not create new user");
	}
});
