var ctx = document.getElementById('barChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ["Technology", "UF", "Celebrities", "Sports"],
        datasets: [{
            label: "Tweets",
            backgroundColor: 'rgb(173, 216, 230)',
            borderColor: 'rgb(0, 0, 255)',
            data: [1200, 2000, 1250, 1500],
        }
    ]
    },

    // Configuration options go here
    options: {
        responsive: true,
        title: {
            display: true,
            text: "Top Topics in Gainesville"
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});