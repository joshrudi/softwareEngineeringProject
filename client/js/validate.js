function write_cookie(id_token) {
    document.cookie = id_token;
}

function validate_website() {
	var id_token = document.cookie;
	console.log(id_token);

	$.ajax({
		url: "/validate_token",
		type: "POST",
		data: { id_token: id_token },
		success: function(data) {
			console.log("Successful validation");
		},
		error: function(err) {
			window.location.href = "/login.html"; // Redirect
		}
	});
}

if (!window.location.href.includes("login.html")) { // Validate for all but the login page
	validate_website();
}
