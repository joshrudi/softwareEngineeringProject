function update_topics(woeid) {
	$.ajax({
		url: "/get_trending",
		type: "POST",
		data: { woeid: woeid, count: 5 },
		success: function(data){
			var trend_data = data;

			for (var i = 0; i < trend_data.length; i ++) {
				$("#topic_list").append("<button class='accordion'>" + trend_data[i].name + "</button>");
				$("#topic_list").append(" \
				<div class='panel'> \
					<div class='card-body'> \
						<div class='container'> \
							<div class='row' style='text-align:center;' id='section_" + i + "'> \
							</div> \
						</div> \
					</div> \
				</div>");
				$.ajax({
					url: "/get_topic_cards",
					type: "POST",
					data: {
						trend_name: trend_data[i].name,
						section: i
					},
					success: function(data){
						for (var j = 0; j < data.html_list.length; j ++) {
							var tweet_element = "<div class='col-md-6 tweet'>";
							tweet_element += data.html_list[j];
							tweet_element += "</div>";
							$("#section_" + data.section).append(tweet_element);
						}

						if (data.section == 4) {
							update_accordions();
						}
					}
				});
			}
		}
	});
}

$.ajax({
	url: "/find_listing",
	type: "POST",
	data: { user_id: read_cookie().user_id },
	success: function(data) {
		update_topics(data.woeid);
	},
	error: function() {
		update_topics(1);
	}
});
