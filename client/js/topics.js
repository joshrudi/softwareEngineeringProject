var trend_data;
$.ajax({
	url: "/get_trending",
	type: "POST",
	data: { woeid: 1, count: 10 },
	async: false,
	success: function(data){
		trend_data = data;
	}
});

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
