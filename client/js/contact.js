function send_my_email() {
	$.ajax({
		url: "/send_email",
		type: "POST",
		data: {
			name: $("#inputName")[0].value,
			email: $("#inputEmail")[0].value,
			issues: $("#inputIssues")[0].value
		},
		success: function(data){}
	});
	
	$("#inputName")[0].value = "";
	$("#inputEmail")[0].value = "";
	$("#inputIssues")[0].value = "";
}

(function() {
  'use strict';
  var snackbarContainer = document.querySelector('#toast-email');
  var showToastButton = document.querySelector('#show-toast');
  showToastButton.addEventListener('click', function() {
    'use strict';
    var data = {message: 'Feedback Sent!'};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  });
}());