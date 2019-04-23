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
				<div class='grid'>\
					<div class='grid-container'>\
						<div class='grid'>\
							<div class='grid-sizer'></div>\
								<div class='demo-card-wide mdl-card mdl-shadow--2dp grid-item' style='background: url() center / cover; height: 176px;'>\
                                  <div class='mdl-card__title'>\
                                    <img src='{{tweet.user.profile_image_url}}' style='border-radius: 50%;'>\
                                    <h2 class='mdl-card__title-text'>{{tweet.user.name}}</h2>\
                                  </div>\
                                  <div class='mdl-card__supporting-text'>\
                                    {{tweet.text}}\
                                  </div>\
                                  <div class='mdl-card__actions mdl-card--border'>\
                                    <a class='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect' href='http://twitter.com/statuses/{{tweet.id_str}}'>\
                                      {{tweet.retweet_count}} people are talking about this!\
                                    </a>\
                                  </div>\
                                  <div class='mdl-card__menu'>\
                                    <button class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>\
                                      <i class='material-icons'>verified_user</i>\
                                    </button>\
                                  </div>\
                            </div>\
                        </div>\
                    </div>\
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
