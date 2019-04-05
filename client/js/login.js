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

	window.location.href = "/index.html"; // Redirect
}

function onLoad() {
    gapi.load('auth2', () => {
        gapi.auth2.init({ client_id: "1068940000938-e63k7elj04j3bk9a1pvq86sm66nkgbc0.apps.googleusercontent.com" }).then(() => {

            // DO NOT ATTEMPT TO RENDER BUTTON UNTIL THE 'Init' PROMISE RETURNS
            renderButton();

        });
    });
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('User signed out.');
		window.open("/login.html","_self");
	});
	write_cookie({ // Clear cookies
		id_token: "",
		user_id: ""
	});
}

function help() {

	alert("Click on 'Sign In' to sign in and continue.  You will be asked to use your Google account to proceed.");
}
