function onSignIn(googleUser) {
	var id_token = googleUser.getAuthResponse().id_token;
	console.log("ID Token: " + id_token);

	$.ajax({
		url: "/validate_token",
		type: "POST",
		data: { id_token: id_token },
		success: function(data){
			write_cookie(id_token);
			window.location.href = "/index.html"; // Redirect
		}
	});
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('User signed out.');
	});
}
