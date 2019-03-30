function onSignIn(googleUser) {
	var id_token = googleUser.getAuthResponse().id_token;
	var user_id = "" + googleUser.getBasicProfile().getId();

	var cookie = {
		id_token: id_token,
		user_id: user_id
	};

	write_cookie(cookie);

	$.ajax({
		url: "/update_listing",
		type: "POST",
		data: {
			user_id: cookie.user_id,
		},
		success: function(data) {
			console.log(data);
		}
	});
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('User signed out.');
	});
}