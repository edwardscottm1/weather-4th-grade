import { startWeatherRetrieval } from "./nwsWeatherFunctions.js";
import { updatePage } from "./updatePage.js";

'use strict';

// Array to allow certain locations only
let allowedLocations = ['city', 'town'];
// Main function 
function main() {
    // Handle user typing in a location
    handleUserTypeLocation();
    
    // Add event listener to submit button
    document.querySelector('form').addEventListener('submit', function(evnt) {
        evnt.preventDefault();
        console.log(document.querySelector('.suggestion'));
        // if (document.querySelector('.suggestion').textContent === '❌ No Location Found') {
        //     console.log('no entry');
        // } else {
        //     // Hide old suggestions
        //     removeOldSuggestions();
        //     // Get coordinates of current entry
        //     getCoordinates();

        // }
        removeOldSuggestions();
        startLoading();
        getCoordinates();
    });

    // Add event listener to ensure the suggestion box hides
    document.querySelector('input[type="search"').addEventListener('focusout', function(evnt) {
        // removeOldSuggestions();
    });
}

function startLoading() {
    let loadingElement = document.querySelector('#loading');
    loadingElement.style.display = 'flex';
}

// Function used to handle when user types in a location
function handleUserTypeLocation() {
    // Declare a timeout variable 
    let timeout;

    // Get element where user types in
    const searchLocationElement = document.querySelector('input[type="search"]');

    // When user types we start a search
    searchLocationElement.addEventListener('input', function () {
        // Get value from entry box
        const USER_INPUT = searchLocationElement.value.trim() ;
        // Endpoint that gets location
        const BASE_URL = 'https://photon.komoot.io/api/?q=';

        // If there is no input we hide the suggestion box and stop this function
        if (USER_INPUT == '') {
            removeOldSuggestions();
            return;
        }
        // If there was a previous timeout, we clear it
        // This ensures that when the user types, api calls are not made on each key stroke
        clearTimeout(timeout);
        // Start a time out
        timeout = setTimeout(async () => {

            try {
                // fetch data
                const response = await fetch(BASE_URL + USER_INPUT);
                
                // if no errors we pass the data to the filter locations function then create the suggestions
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    let suggestedLocations = filterLocations(data);
                    createSuggestions(suggestedLocations);
                } else {
                    // If error occurred, we throw an error
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }, 300);
});
}

// Function used to filter locations
// Enures only cities in USA are shown. This still has some bugs. Sometimes it shows duplicate of locations
function filterLocations(data) {
    let filteredData = data.features.filter(location => location.properties.country == 'United States' && allowedLocations.includes(location.properties.type));
    return filteredData;
}

// FUnction used to create suggestions on screen for autocomplete
function createSuggestions(suggestedLocations) {
    // Get suggestions div
    let suggestLocationsElement = document.querySelector('#suggested-locations');
    // Remove old suggestions
    removeOldSuggestions();
    // Add padding so it is visible
    suggestLocationsElement.style.paddingBlock = '3px';
    // If there are no locations, we show user no location found
    if (suggestedLocations.length == 0) {
        let noLocationElement = document.createElement('p');
        noLocationElement.innerHTML = '❌ No Location Found';
        noLocationElement.classList.add('suggestion');
        suggestLocationsElement.appendChild(noLocationElement);
    } else {   
    // If locations are found, we create a p tag for each location
    for (let location of suggestedLocations) {
        let locationElement = document.createElement('p');
        locationElement.addEventListener('click', handleClickSuggestion); 
        locationElement.innerHTML = `📍${location.properties.name}, ${location.properties.state}`;
        locationElement.classList.add('suggestion');
        suggestLocationsElement.appendChild(locationElement);            
        }
    }
}

// Function used to remove old suggestions
function removeOldSuggestions() {
    let suggestLocationsElement = document.querySelector('#suggested-locations');
    // Remove padding so div can be hidden
    suggestLocationsElement.style.paddingBlock = '0px';
    
    let suggestedLocations = document.querySelectorAll('.suggestion');
    for (let location of suggestedLocations) {
        location.parentElement.removeChild(location);
    }
}

// Function used to handle use clicking on a suggested auto complete
function handleClickSuggestion(evnt) {
    // console.log('clicked!' + evnt.target);
    // Hide the div
    removeOldSuggestions();
    startLoading()
    evnt.preventDefault();
    evnt.stopPropagation();

    // Get entered location
    let location = evnt.target.innerText.slice(2);

    // Input it to the search box
    document.querySelector('input[type="search"]').value = location;
    // Get the coordinates of the location
    getCoordinates();
}

async function getCoordinates() {
    let timeout;
    console.log('getting coords')
    // const searchLocationElement = document.querySelector('input[type="search"]');
    const USER_INPUT = document.querySelector('input[type="search"]').value;
    // console.log(USER_INPUT);
    const BASE_URL = 'https://photon.komoot.io/api/?q=';

        if (USER_INPUT == '') {
            return;
        }
        clearTimeout(timeout);

        timeout = setTimeout(async () => {

            try {
                const response = await fetch(BASE_URL + USER_INPUT);

                if (response.ok) {
                    var data = await response.json();
                    console.log(data);
                    data = filterLocations(data);
                    // console.log(data);
                    let locationData = {
                        name: `${data[0].properties.name}, ${data[0].properties.state}`,
                        lon: data[0].geometry.coordinates[0],
                        lat: data[0].geometry.coordinates[1]
                    }
                    console.log('fetching data');
                    const weatherData = await  startWeatherRetrieval(locationData);
                    updatePage(weatherData);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }, 300);
}


main();