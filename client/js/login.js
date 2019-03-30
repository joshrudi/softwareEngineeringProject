function onSignIn(googleUser) {
	var id_token = googleUser.getAuthResponse().id_token;
	write_cookie(id_token);
	console.log(id_token);
	//window.location.href = "/index.html"; // Redirect
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('User signed out.');
	});
}
