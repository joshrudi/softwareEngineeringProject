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

	alert("Message Sent");

	$("#inputName")[0].value = "";
	$("#inputEmail")[0].value = "";
	$("#inputIssues")[0].value = "";
}
