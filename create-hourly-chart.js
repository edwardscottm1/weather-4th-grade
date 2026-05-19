'user strict';

// Main function 
function main() {
  hourlyTemperature();
  hourlyWind();
  hourlyPrecipitation();
};

function hourlyTemperature() {
  // add data
  var temps = [50, 52, 56, 58, 61, 63, 67, 66, 61, 57, 53, 52, 48];
  
  let hours = ["8 AM", "9 AM","10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"];
  
  const ctx = document.getElementById('temps');
  
  window.tempsGraph = new Chart(ctx, {
   type: 'line',
  
   data: {
     labels: hours,
     datasets: [{
       label: 'Temperature °F',
       data: temps,
       borderWidth: 3,
       tension: .5,
       borderColor: '#ed5142',
       // backgroundColor: '#e7706571',
       // fill: true,
     //   fillColor: 'red'
     //   startAtZero: true
     }]
   },
  
   options: {
     responsive: true,
     maintainAspectRatio: false,
     plugins: {
       legend: {
         display: true,
         labels: {
           color: 'black',
         }
       }
     },
     scales: {
       x: {
         title: {
             display: true,
             text: 'Hour',
             color: 'black',
             font: {
                 size: 15
             }
         },
  
         ticks: {
           color: 'black',
           font: {
             size: 12
           }
         },
  
         grid: {
           color: '#d6d0d0'
         },
         border: {
             color: 'black'
         }
  
       },
  
       y: {
        suggestedMax: 100,
        suggestedMin: 0,
         title: {
             display: true,
             text: 'Temperature (F)',
             color: 'black',
             font: {
                 size: 15
             }
         },
         ticks: {
           color: 'black',
           font: {
             size: 12
           }
         },
  
         grid: {
           color: '#d6d0d0'
         },
         beginAtZero: false,
         border: {
             color: 'black'
         }
       }
     }
   }
  });
}


function hourlyPrecipitation() {
  // add data
  var temps = [10, 22, 36, 28, 11, 23, 27, 26, 21, 27, 33, 42, 68];
  
  let hours = ["8 AM", "9 AM","10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"];
  
  const ctx = document.getElementById('precipitation');
  
  window.percipGraph = new Chart(ctx, {
   type: 'line',
  
   data: {
     labels: hours,
     datasets: [{
       label: 'Precipitation %',
       data: temps,
       borderWidth: 3,
       tension: .5,
       borderColor: '#55bce8',
       // backgroundColor: '#e7706571',
       // fill: true,
     //   fillColor: 'red'
       startAtZero: true
     }]
   },
  
   options: {
     responsive: true,
     maintainAspectRatio: false,
     plugins: {
       legend: {
         display: true,
         labels: {
           color: 'black',
         }
       }
     },
     scales: {
       x: {
         title: {
             display: true,
             text: 'Hour',
             color: 'black',
             font: {
                 size: 15
             }
         },
  
         ticks: {
           color: 'black',
           font: {
             size: 12
           }
         },
  
         grid: {
           color: '#d6d0d0'
         },
         border: {
             color: 'black'
         }
  
       },
  
       y: {
        max: 100,
        min: 0,
         title: {
             display: true,
             text: 'Precipitation (%)',
             color: 'black',
             font: {
                 size: 15
             }
         },
         ticks: {
           color: 'black',
           font: {
             size: 12
           }
         },
  
         grid: {
           color: '#d6d0d0'
         },
         beginAtZero: true,
         border: {
             color: 'black'
         }
       }
     }
   }
  });
}

function hourlyWind() {
  // add data
  var temps = [10, 12, 16, 18, 21, 23, 27, 16, 11, 7, 3, 2, 8];
  
  let hours = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"];
  
  const ctx = document.getElementById('wind');
  
  window.windGraph = new Chart(ctx, {
   type: 'line',
  
   data: {
     labels: hours,
     datasets: [{
       label: 'Wind Speed (mph)',
       data: temps,
       borderWidth: 3,
       tension: .5,
       borderColor: '#41a540',
       // backgroundColor: '#e7706571',
       // fill: true,
     //   fillColor: 'red'
     //   startAtZero: true
     }]
   },
  
   options: {
     responsive: true,
     maintainAspectRatio: false,
     plugins: {
       legend: {
         display: true,
         labels: {
           color: 'black',
         }
       }
     },
     scales: {
       x: {
         title: {
             display: true,
             text: 'Hour',
             color: 'black',
             font: {
                 size: 15
             }
         },
  
         ticks: {
           color: 'black',
           font: {
             size: 12
           }
         },
  
         grid: {
           color: '#d6d0d0'
         },
         border: {
             color: 'black'
         }
  
       },
  
       y: {
        suggestedMax: 50,
        min: 0,
         title: {
             display: true,
             text: 'Wind Speed (mph)',
             color: 'black',
             font: {
                 size: 15
             }
         },
         ticks: {
           color: 'black',
           font: {
             size: 12
           }
         },
  
         grid: {
           color: '#d6d0d0'
         },
         beginAtZero: false,
         border: {
             color: 'black'
         }
       }
     }
   }
  });

}




// Main function call
main();