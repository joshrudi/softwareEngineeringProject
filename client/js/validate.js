function write_cookie(cookie) {
    document.cookie = cookie.id_token + "||||" + cookie.user_id;
}

function read_cookie() {
	var guk = document.cookie.split(" ");
	var actual_cookie = guk[guk.length-1];
	var bits = actual_cookie.split("||||");
	var cookie = {
		id_token: bits[0],
		user_id: bits[1],
	}
	return cookie;
}

function validate_website() {
	var cookie = read_cookie();
	var id_token = cookie.id_token;

	$.ajax({
		url: "https://oauth2.googleapis.com/tokeninfo",
		type: "GET",
		data: { id_token: id_token },
		async: false,
		success: function(data){
			if (data.aud != "1062776272507-cu3jrfvoh587svb9qrifs7fqkhhsc5rq.apps.googleusercontent.com") {
			 	window.location.href = "/login.html"; // Redirect
			 	return;
			}
			console.log("Token Valid");
		},

		error: function(err) {
			window.location.href = "/login.html"; // Redirect
		}
	});
}

if (!window.location.href.includes("login.html")) { // Validate for all but the login page
	validate_website();
}
