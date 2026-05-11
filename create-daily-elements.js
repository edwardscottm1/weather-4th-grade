'user strict';

// Main function 
function main() {
    // Get Div that holds the hours
    let daysDiv = document.querySelector('#days');
    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday',
                      'Wednesday', 'Thursday',
                      'Friday', 'Saturday'
     ]
    // Create 7 divs that hold data for 7 days
    for (let i = 1; i <= daysOfWeek.length; i++) {
        // Create div
        let dayDiv = document.createElement('div');
        dayDiv.classList.add('day');

        // Create Day label
        let dayLabel = document.createElement('p');
        dayDiv.innerHTML = daysOfWeek[i];

        // Create img
        let conditionImage = document.createElement('img');
        conditionImage.setAttribute('src', 'images/bkn.png');
    }

}


// Main function call
main();