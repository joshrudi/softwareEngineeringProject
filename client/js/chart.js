let myChart = document.getElementById('myChart').getContext('2d');

//Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';

var num_topics = 10;
var custom_chart = null;

function update_chart(woeid, name) {
	$.ajax({
		url: "/get_trending",
		type: "POST",
		data: { woeid: woeid, count: num_topics },
		success: function(best_topics){
			var topic_names = []
			for (var i = 0; i < best_topics.length; i ++) { // Get the names of those topics
				topic_names.push(best_topics[i].name);
			}

			var topic_volume = []
			for (var i = 0; i < best_topics.length; i ++) { // Get the volume of those topics
				topic_volume.push(best_topics[i].tweet_volume);
			}

			var topic_colors = []
			for (var i = 0; i < best_topics.length; i ++) { // Get random colors for topics
				topic_colors.push('rgba(' + Math.random()*255 + ', ' + Math.random()*255 + ', ' + Math.random()*255 + ', 0.6)');
			}

			if (custom_chart == null) {
				custom_chart = new Chart(myChart, {
					type: 'bar', //bar, horizantal, pie, line, doughnout, radar, polarArea
					data:{
						labels:topic_names,
						datasets:[{
							label: 'Tweet Volume',
							data: topic_volume,
							backgroundColor: topic_colors,
							borderWidth:1,
							borderColor: '#777',
							hoverBorderWidth:3,
							hoverBorderColor: 'blue',
							hoverBackgroundColor: topic_colors
						}]
					},
					options:{
						title:{
							display:true,
							text: 'Most Popular Topics ' + name,
							fontSize:25
						},
						legend:{
							display:false,
							position:'right',
							labels:{
								fontColor: '#000'
							}
						},
						layout:{
							padding:{
								left:10,
								right:150,
								bottom:10,
								top:10
							}
						}
					}
				});
			} else {
				var dataset = custom_chart.data.datasets[0];
				dataset.backgroundColor = topic_colors;
				dataset.data = topic_volume;
				custom_chart.data.labels = topic_names;
				custom_chart.titleBlock.options.text = "Most Popular Topics " + name;
				custom_chart.update();
			}

		}
	});
}

update_chart(1, 'Worldwide');
