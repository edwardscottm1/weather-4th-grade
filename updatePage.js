'use strict';

export function updatePage(weatherData) {
    console.log(weatherData);
    updateCurrent(weatherData.current, weatherData.location, weatherData.dailyForecast, weatherData.hourlyForecast);
    updateSun(weatherData.sun);
    updateMoon(weatherData.moonImage, weatherData.moonPhase);
    updateDay(weatherData.dailyForecast);
    updateHour(weatherData.hourlyForecast);

    let weatherElements = document.querySelectorAll('.data');
    for (let element of weatherElements) {
        element.style.opacity = 1;
        element.style.translate = '0px 0px';
    }
    stopLoading();

}


function updateCurrent(current, location, daily, hour) {
    // Update location
    document.querySelector('#location').textContent = location;
    // Update current temp
    document.querySelector('#current-temp').textContent = `${current.currentTemp}°F`;
    // Update high low temps
    // If it is day update both, when night update the night temp only
    if (daily[0].isDay) {
        document.querySelector('#current-day-temp span').textContent = daily[0].temperature;
        document.querySelector('#current-night-temp span').textContent = daily[1].temperature;
    } else {
        document.querySelector('#current-day-temp span').textContent = '--';
        document.querySelector('#current-night-temp span').textContent = daily[0].temperature;
    }

    //extra data
    // Update current wind
    document.querySelector('#current-wind').textContent = `Wind: ${current.windSpeed} mph ${current.windDirection}`;

    // Update current feels like
    document.querySelector('#current-feels-like').textContent = `Feels Like: ${current.feelsLike}°F`;

    // Update current precipitation
    document.querySelector('#current-precipitation').textContent = `Precipitation: ${hour[0].precipitation}%`;

    // Update current humidity
    document.querySelector('#current-humidity').textContent = `Humidity: ${current.humidity}%`;

    // Update dew point
    document.querySelector('#current-dew-point').textContent = `Dew Point: ${current.dewPoint}°F`;

    // Update condition image
    document.querySelector('#current-condition').setAttribute ('src', `nwsConditions/${current.conditionImage}.webp`);

    // Update condition description
    document.querySelector('#current-condition-description').textContent = daily[0].conditionDescription;
}
// Function used to update the sun data
function updateSun(sunData) {
    // Update sun rise and set data
    let sunHours = document.querySelectorAll('.hour');
    for (let i = 0; i < sunHours.length; i++) {
        sunHours[i].textContent = sunData[i];
    }
}
// Function used to update the moon data
function updateMoon(image, phase) {
    document.querySelector('#moon').setAttribute('src', image);
    document.querySelector('#moon-phase-label').textContent = phase;
    
}
function updateDay(dailyData) {
    let daysData = dailyData.filter(day => day.isDay);
    let nightsData = dailyData.filter(night => !night.isDay);
    // Update the day label
    let dayLabels = document.querySelectorAll('.day-label');
    for (let i = 0; i < daysData.length; i++) {
        if (daysData[i].name > 12) {
            dayLabels.style.fontSize  = 'clamp(.8rem, 1vw, 1.7rem)';
        }
        dayLabels[i].textContent = daysData[i].name;
    }

    // Update condition image
    let conditionImages = document.querySelectorAll('.day img');
    for (let i = 0; i < daysData.length; i++) {
        conditionImages[i].setAttribute('src', `nwsConditions/${daysData[i].conditionImage}.webp`);
    }

    // update day temp
    let dayTemps = document.querySelectorAll('.day-temp');
    for (let i = 0; i < dayTemps.length; i++) {
        dayTemps[i].textContent = `${daysData[i].temperature}°F`;
    }
    // update night temp
    let nightTemps = document.querySelectorAll('.night-temp');
    for (let i = 0; i < nightTemps.length; i++) {
        nightTemps[i].textContent = `${nightsData[i].temperature}°F`;
    }

    // update precipitation
    let precipitationElements = document.querySelectorAll('.day-precip span');
    for (let i = 0; i < precipitationElements.length; i++) {
        precipitationElements[i].textContent = dailyData[i].precipitation;
    }
    // update wind
    let windElements = document.querySelectorAll('.day-wind span');
    for (let i = 0; i < windElements.length; i++) {
        windElements[i].textContent = dailyData[i].windSpeed;
    }
}
function updateHour(hourlyData) {
   
    // Get hours
    let hours = []
    for (let hour of hourlyData) {
        hours.push(hour.hour);
    }
    // Get temps
    let temps = [];
    for (let hour of hourlyData) {
        temps.push(hour.temperature);
    }

    //Get precipitations
    let percips = [];
    for (let hour of hourlyData) {
        percips.push(hour.precipitation);
    }

    // Get wind
    let winds = [];
    for (let hour of hourlyData) {
        winds.push(hour.windSpeed);
    }
    
    // Update the graphs
    window.tempsGraph.data.datasets[0].data = temps;
    window.tempsGraph.data.labels = hours;
    window.tempsGraph.update();

    window.percipGraph.data.datasets[0].data = percips;
    window.percipGraph.data.labels = hours;
    window.percipGraph.update();

    window.windGraph.data.datasets[0].data = winds;
    window.windGraph.data.labels = hours;
    window.windGraph.update();

}

function stopLoading() {
    let loadingElement = document.querySelector('#loading');
    loadingElement.style.display = 'none';
}