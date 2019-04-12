var snackbarContainer = document.querySelector('#toast-email');
var showToastButton = document.querySelector('#show-toast');
var success_data = {message: 'Feedback Sent!'};
var error_data = {message: 'Uh oh! Error!'};

function send_my_email() {
	if ($("#inputName")[0].value === '' || $("#inputEmail")[0].value === '' || $("#inputIssues")[0].value === '') {
		snackbarContainer.MaterialSnackbar.showSnackbar(error_data);
	} else {

		var cookie = read_cookie();

		$.ajax({
			url: "/send_email",
			type: "POST",
			data: {
				name: $("#inputName")[0].value,
				email: $("#inputEmail")[0].value,
				issues: $("#inputIssues")[0].value,
				user_id: cookie.user_id,
			},
			success: function(data){
				snackbarContainer.MaterialSnackbar.showSnackbar(success_data);

				$("#inputName")[0].value = "";
				$("#inputEmail")[0].value = "";
				$("#inputIssues")[0].value = "";
			},
			error: function() {
				snackbarContainer.MaterialSnackbar.showSnackbar(error_data);
			}
		});
	}
}
