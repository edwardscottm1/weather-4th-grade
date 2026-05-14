'user strict';

// Main function 
function main() {
     // add data
    var temps = [50, 52, 56, 58, 61, 63, 67, 66, 61, 57, 53, 52, 48];

    let hours = ["8 AM", "9 AM","10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"];

    const ctx = document.getElementById('temps');

     new Chart(ctx, {
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
            display: false,
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
};




// Main function call
main();