let myChart = document.getElementById('myChart').getContext('2d');

                      //Global Options
                      Chart.defaults.global.defaultFontFamily = 'Roboto';
                      Chart.defaults.global.defaultFontSize = 18;
                      Chart.defaults.global.defaultFontColor = '#777';


                      let customChart = new Chart(myChart,{
                        type: 'bar', //bar, horizantal, pie, line, doughnout, radar, polarArea
                        data:{
                          labels:['Boston','Worscester','Cambridge','Lowell','New Orelands'],
                          datasets:[{
                            label: 'Tweets', 
                            data:[
                              12312,
                              12312,
                              3231,
                              31231,
                              21211,
                            ],
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
                            hoverBorderColor: 'blue',
                          }]
                        },
                        options:{
                          title:{
                            display:false,
                            text: 'Most Popular Tweets',
                            fontSize: 15,
                          },
                          legend:{
                            display:false,
                            position:'right',
                            labels:{
                              fontColor: 'black',
                            }
                          },
                          layout:{
                            padding:{
                              left:10,
                              right:150,
                              bottom:10,
                              top:10
                            }
                          },
                          scales: {
                              xAxes: [{
                                  ticks: {
                                      fontSize: 15
                                  }
                              }],
                              yAxes: [{
                                  ticks: {
                                      fontSize: 15
                                  }
                              }]
                          }
                        }
                      });