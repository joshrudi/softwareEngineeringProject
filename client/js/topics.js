$.ajax({
	url: "/find_listing",
	type: "POST",
	data: { user_id: read_cookie().user_id },
	async: false,
	success: function(data) {
		var woeid = data.woeid;

		$.ajax({
			url: "/get_trending",
			type: "POST",
			data: { woeid: woeid, count: 4 },
			async: false,
			success: function(data){
				var trend_data = data;

				for (var i = 0; i < trend_data.length; i ++) {
					$.ajax({
						url: "/get_topic_cards",
						type: "POST",
						data: {
							trend_name: trend_data[i].name
						},
						success: function(data){
							for (var j = 0; j < data.length; j ++) {
								$("body").append(data[j]);
							}
						}
					});
				}
			}
		});
	}
});
