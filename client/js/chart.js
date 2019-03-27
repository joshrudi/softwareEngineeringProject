let myChart = document.getElementById('myChart').getContext('2d');

//Global Options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';

var num_trends = 5;
$.ajax({
	url: "/get_trending",
	type: "GET",
	data: {},
	success: function(data){
		var trends = []
		var j = 0;
		for (var i = 0; j < num_trends; i++) {
			if (data[i].tweet_volume != null) {
				trends.push(data[i]);
				j ++;
			}
		}

		var trend_names = []
		for (var i = 0; i < num_trends; i ++) {
			trend_names.push(trends[i].name);
		}

		var trend_counts = []
		for (var i = 0; i < num_trends; i ++) {
			trend_counts.push(trends[i].tweet_volume);
		}
		console.log(trend_counts);

		let customChart = new Chart(myChart,{
		  type: 'bar', //bar, horizantal, pie, line, doughnout, radar, polarArea
		  data:{
			labels:trend_names,
			datasets:[{
			  label: 'Tweets',
			  data: trend_counts,
			  backgroundColor:[
				'rgba(255, 99, 132, 0.6)',
				'rgba(54, 162, 235, 0.6)',
				'rgba(125, 19, 132, 0.6)',
				'rgba(255, 29, 132, 0.6)',
				'rgba(255, 49, 255, 0.6)',
			  ],
			  borderWidth:1,
			  borderColor: '#777',
			  hoverBorderWidth:3,
			  hoverBorderColor: 'blue'

			}]
		  },
		  options:{
			title:{
			  display:true,
			  text: 'Most Popular Tweets',
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

	}
});
