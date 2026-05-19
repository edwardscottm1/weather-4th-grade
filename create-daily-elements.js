'user strict';

// Main function 
function main() {
    // Get Div that holds the hours
    let daysDiv = document.querySelector('#days');
    // Create 12 divs that hold data for 12 hours
        for (let i = 1; i < 8; i++) {
        //Create div for the hour
        let dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        // Create label to show hour of div
        let hourLabel = document.createElement(`p`);
        hourLabel.textContent = 'Monday';
        hourLabel.classList.add('day-label');
        // Create image for condition
        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', 'nwsConditions/bkn.webp')
        imageElement.classList.add('image');
        // Create temp label
        let tempDayElement = document.createElement('p');
        tempDayElement.textContent = '78°F';
        tempDayElement.classList.add('day-temp');

        let tempNightElement = document.createElement('p');
        tempNightElement.textContent = '54°F';
        tempNightElement.classList.add('night-temp');

        // Create percip label
        let precipElement = document.createElement('p');
        precipElement.innerHTML = '💦<span>40</span>%';
        precipElement.classList.add('day-precip');

        // Create wind label
        let windElement = document.createElement('p');
        windElement.innerHTML = '🍃<span>10 - <span>20</span> mph';
        windElement.classList.add('day-wind');

        // Append these elements to the page
        dayDiv.appendChild(hourLabel);
        dayDiv.appendChild(imageElement);
        dayDiv.appendChild(tempDayElement);
        dayDiv.appendChild(tempNightElement);
        dayDiv.appendChild(precipElement);
        dayDiv.appendChild(windElement);

        // Append the the hour div to the page
        daysDiv.appendChild(dayDiv);
   }

}


// Main function call
main();