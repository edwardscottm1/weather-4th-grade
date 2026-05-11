'user strict';

// Main function 
function main() {
    // Get Div that holds the hours
    let hoursDiv = document.querySelector('#hours');
    // Create 12 divs that hold data for 12 hours
        for (let i = 1; i < 13; i++) {
        //Create div for the hour
        let hourDiv = document.createElement('div');
        hourDiv.classList.add('hour');
        // Create label to show hour of div
        let hourLabel = document.createTextNode(`-- AM`);
        // Create image for condition
        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', 'images/bkn.png')
        imageElement.classList.add('image');
        // Create temp label
        let tempElement = document.createElement('p');
        tempElement.textContent = '78°F';
        tempElement.classList.add('hour-temp');

        // Create percip label
        let precipElement = document.createElement('p');
        precipElement.innerHTML = '💦40%';
        precipElement.classList.add('hour-precip');

        // Create wind label
        let windElement = document.createElement('p');
        windElement.innerHTML = '🍃10 mph';
        windElement.classList.add('hour-wind');

        // Append these elements to the page
        hourDiv.appendChild(hourLabel);
        hourDiv.appendChild(imageElement);
        hourDiv.appendChild(tempElement);
        hourDiv.appendChild(precipElement);
        hourDiv.appendChild(windElement);

        // Append the the hour div to the page
        hoursDiv.appendChild(hourDiv);
   }

}


// Main function call
main();