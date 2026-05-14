// Edward Scott 5/6/26 - Yellowstone Adventure


'use strict';

// let timeout;
let allowedLocations = ['city', 'town'];
// Main function 
function main() {
    hanldeUserTypeLocation();
    document.querySelector('form').addEventListener('submit', function(evnt) {
        evnt.preventDefault();
        removeOldSuggestions();
        getCoordinates();
    });

    document.querySelector('input[type="search"').addEventListener('focusout', function(evnt) {
        
    })
}

function hanldeUserTypeLocation() {
    let timeout;

    const searchLocationElement = document.querySelector('input[type="search"]');

    searchLocationElement.addEventListener('input', function () {

        // console.log(searchLocationElement.value);
        const USER_INPUT = searchLocationElement.value.trim() ;
        const BASE_URL = 'https://photon.komoot.io/api/?q=';

        
        if (USER_INPUT == '') {
            removeOldSuggestions();
            return;
        }
        clearTimeout(timeout);

        timeout = setTimeout(async () => {

            try {
                const response = await fetch(BASE_URL + USER_INPUT);

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    let suggestedLocations = filterLocations(data);
                    creatSuggestions(suggestedLocations);
                } else {

                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }, 300);


});
}

function filterLocations(data) {
    let filteredData = data.features.filter(location => location.properties.country == 'United States' && allowedLocations.includes(location.properties.type));
    // console.log(filteredData);
    return filteredData;
}


function creatSuggestions(suggestedLocations) {
    let suggestLocationsElement = document.querySelector('#suggested-locations');
    removeOldSuggestions();
    suggestLocationsElement.style.paddingBlock = '3px';
    if (suggestedLocations.length == 0) {
        let noLocationElement = document.createElement('p');
        noLocationElement.innerHTML = '❌ No Location Found';
        noLocationElement.classList.add('suggestion');
        suggestLocationsElement.appendChild(noLocationElement);
    } else {   
        document.querySelector('#suggested-locations').addEventListener('click', handleClickSuggestion); 
        for (let location of suggestedLocations) {
            let locationElement = document.createElement('p');
            locationElement.innerHTML = `📍${location.properties.name}, ${location.properties.state}`;
            locationElement.classList.add('suggestion');
            suggestLocationsElement.appendChild(locationElement);
            // suggestLocationsElement.addEventListener('click', handleClickSuggestion);

            
        }
    }
}

function removeOldSuggestions() {
    let suggestLocationsElement = document.querySelector('#suggested-locations');
    suggestLocationsElement.style.paddingBlock = '0px';
    
    let suggestedLocations = document.querySelectorAll('.suggestion');
    for (let location of suggestedLocations) {
        location.parentElement.removeChild(location);
    }
}


function handleClickSuggestion(evnt) {
    removeOldSuggestions();
    evnt.preventDefault();
    evnt.stopPropagation();

    let location = evnt.target.innerText.slice(2);
    document.querySelector('input[type="search"]').value = location;
    getCoordinates();

    // getCoordinates();

}

function getCoordinates() {
    let timeout;
    const searchLocationElement = document.querySelector('input[type="search"]');
    let userEnteredLocation = document.querySelector('input[type="search"').value.slice(2);
    const USER_INPUT = searchLocationElement.value.trim();
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
                    console.log(data);
                    let locationData = {
                        name: `${data[0].properties.name}, ${data[0].properties.state}`,
                        lon: data[0].geometry.coordinates[0],
                        lat: data[0].geometry.coordinates[0]
                    }
                    startWeatherRetrieval(locationData);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }, 300);
}

 function startWeatherRetrieval(locationData) {
    
    console.log(locationData);
 }

main();