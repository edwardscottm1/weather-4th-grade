import { determineMoonPhase } from './getMoonPhase.js';



const BASE_URL = "https://api.weather.gov";
const KM_To_M = 0.621371 

// Function used to convert celsius to fahrenheit
function convertCtoF(units, value) {
    if (units == "wmoUnit:degC"){
        if (value == null) {
            return 0;
        }
        return Math.round((value * 9 / 5) + 32);
    }
    else {
        if (value == null) {
            return 0;
        }
        return value;
    }
}

// Function used to calculate feels like temperature 
function calculateFeelsLike(windSpeed, currentTemp, humidity) {
    if (currentTemp <= 50 && windSpeed >= 3){
        return Math.round(35.74 + (0.6215 * currentTemp) - (35.75 * (windSpeed ** 0.16)) + 0.4275 * (currentTemp * (windSpeed ** 0.16)),0);
    } else if (currentTemp > 80) {
            return Math.round(-43.379 + 2.04901523 * (currentTemp) + 10.14333127 * (humidity) - 0.22475541 * (currentTemp) * (humidity) -0.00683783 * (currentTemp ** 2) - 0.05481717 * (humidity ** 2) +0.00085282 * (currentTemp * (humidity ** 2)) - 0.00000199*((currentTemp ** 2) * (humidity ** 2)),0);
    } else {
        return Math.round(currentTemp);
    }
}


// Function used to determine wind direction
function determineWindDirection(angle){
    if (angle === null)
        return "";
    if (angle>=340 || angle<=20)
        return "E";
    else if (angle > 20 && angle < 70)
        return "NE";
    else if (angle >= 70 && angle <= 110)
        return "N";
    else if (angle > 110 && angle < 160)
        return "NW";
    else if (angle >= 160 && angle <= 200)
        return "W";
    else if (angle > 200 && angle < 250)
        return "SW";
    else if (angle >= 250 && angle <= 290)
        return "S";
    else if (angle > 290 && angle < 340)
        return "SE";
}

// Function used to get condition abbreviation for condition
function getConditionAbbreviation(url) {
    const conditionAbbreviations = [
                             "wind_skc","wind_few","wind_sct","wind_bkn","wind_ovc",
                             "rain_snow","rain_sleet","snow_sleet","rain_fzra","snow_fzra",
                             "rain_showers_hi", "rain_showers", "tsra_sct","tsra_hi","tornado","hurricane",
                             "tropical_storm","dust","skc","few","sct","bkn","ovc","snow", 'fzra',
                             "sleet","rain", "tsra", "smoke","haze","hot","cold","blizzard","fog"
                            ];
    const nonNightAbbreviations = ['hurricane', 'haze', 'hot'];

    if (url === null)
        return 'n/a';
    for( let abbreviation of conditionAbbreviations) {
        if (url.includes(abbreviation)) {
            if (url.includes(nonNightAbbreviations)) {
                return abbreviation;
            } else {
                if (url.includes('day')) {
                    return abbreviation;
                } else if (url.includes('night')) {
                    return 'n' + abbreviation;
                }
            }
        }
    }
}

// Function used to make api calls to nws endpoints
async function makeNWSRequest(url) {
    const headers = {
        user_agent: 'simpleWeatherSite'
    }
    try {
        const response = await fetch(url, headers);

        if (response.ok) {
            var data = await response.json();
            return data
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function used to get current conditions
async function nwsCurrentConditions(stationsURL, BASE_URL, user_agent) {
    let data = await makeNWSRequest(stationsURL);
    // To get current conditions, we need to get the closest weather station
    // Sometimes this stations gives bogus data, thats a shame
    let stationIdentifier = data.features[0].properties.stationIdentifier;
    
    // Make API call
    let currentDataRequest = await makeNWSRequest(`${BASE_URL}/stations/${stationIdentifier}/observations/latest`, user_agent)
    // console.log(currentDataRequest);
    
    if (currentDataRequest) {
        let currentData = {};
        
        // Get wind speed
        if (currentDataRequest.properties.windSpeed.value !== null)
            currentData.windSpeed = Math.round(currentDataRequest.properties.windSpeed.value * KM_To_M);
        else
            currentData.windSpeed = 0;
        
        // Get wind direction
        currentData.windDirection = determineWindDirection(currentDataRequest.properties.windDirection.value);

        // Get humidity
        if(currentDataRequest.properties.relativeHumidity.value !== null)
            currentData.humidity = Math.round(currentDataRequest.properties.relativeHumidity.value);
        else
            currentData.humidity = 0;
        
        // Get condition image
        currentData.conditionImage = getConditionAbbreviation(currentDataRequest.properties.icon);

        // Get dew point
        currentData.dewPoint = Math.round(convertCtoF(currentDataRequest.properties.dewpoint.unitCode, currentDataRequest.properties.dewpoint.value));

        // Getting current temp
        currentData.currentTemp = convertCtoF(currentDataRequest.properties.temperature.unitCode, currentDataRequest.properties.temperature.value);
        
        // Get feels like temp
        currentData.feelsLike = calculateFeelsLike(currentData.windSpeed, currentData.currentTemp, currentData.humidity);
        
        return currentData;
    }
}

// Function used to get daily forecast data
async function nwsDailyForecast(forecastURL) {
    // Get forecast data
    let data = await makeNWSRequest(forecastURL);
    console.log(data)
    // We get data for 7 days
    let dailyForecastData = [];
    for (let day = 0; day < 14; day++) {
        // Get day
        let name = data.properties.periods[day].name === 'This Afternoon'? 'Today': data.properties.periods[day].name;
        let isDay = data.properties.periods[day].isDaytime;
        // Get temperature
        let temp = data.properties.periods[day].temperature;
        // Get precipitation
        let precipitation = Math.round(data.properties.periods[day].probabilityOfPrecipitation.value / 10) * 10;
        // Get wind speed
        let windSpeed = data.properties.periods[day].windSpeed;
        // let detailedForecast = data.properties.periods[day].detailedForecast;
        // Get condition image
        let conditionImage = getConditionAbbreviation(data.properties.periods[day].icon);
        let condition = data.properties.periods[day].detailedForecast;

        dailyForecastData.push({
            name: name, isDay: isDay, temperature: temp,
            conditionImage: conditionImage, precipitation: precipitation, 
            windSpeed: windSpeed, conditionDescription: condition
        });
    }
    return dailyForecastData;
}

// Function to get hourly forecast data
async function nwsHourlyForecast(forecastHourlyURL) {
    let data = await makeNWSRequest(forecastHourlyURL);
    // array to store data for each hour
    let hourlyForecastData = [];
    
    // We get 12 hours of data, we don't get the current hour
    for (let i = 1; i < 13; i++) {

        // This is used to get the hour, converts it to just an hour with am/pm
        const dateObj = new Date(data.properties.periods[i].startTime);
        const options = { hour: 'numeric', hour12: true };
        let hour = dateObj.toLocaleTimeString('en-US', options);
        
        // Save temp
        let temp = data.properties.periods[i].temperature;
        // Save precipitation
        let precipitation = data.properties.periods[i].probabilityOfPrecipitation.value;
        // Save wind speed
        let windSpeed = Number(data.properties.periods[i].windSpeed.replace('mph', ''));
        
        
        // let humidity = data.properties.periods[i].relativeHumidity.value;

        // let feelsLike = calculateFeelsLike(windSpeed, temp, humidity);
        // let condition = data.properties.periods[i].shortForecast;
        // let conditionImage = getConditionAbbreviation(data.properties.periods[i].icon);
        hourlyForecastData.push({
            hour: hour, temperature: temp, precipitation: precipitation,
            windSpeed: windSpeed
        });
    }
    return hourlyForecastData;
    
}
// AI MADE THIS
// Function used to convert 24 to 12 hour
function convertTo12Hour(time24) {
    let [hours, minutes] = time24.split(":");

    hours = Number(hours);

    let period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    // Convert 0 to 12
    hours = hours || 12;

    return `${hours}:${minutes} ${period}`;
}

// Function used to get sun data(sunrise and sunset)
async function getSunData(lon, lat, data) {
    // We get the timezone
    let timeZone = data.properties.astronomicalData.sunrise;
    timeZone = Number(timeZone.slice(19,22));
    // NOAA needs the data to get data

    let date = new Date();
    let currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    
    // Make API call to get data
    const URL = `https://aa.usno.navy.mil/api/rstt/oneday?date=${currentDate}&coords=${lat},${lon}&tz=${timeZone}`;
    try {
        const response = await fetch(URL);

        if (response.ok) {
            var data = await response.json();
            // console.log(data);
            let sunRise = convertTo12Hour(data.properties.data.sundata[1].time);
            let sunSet = convertTo12Hour(data.properties.data.sundata[3].time);
            return [sunRise, sunSet];
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error:', error);
    }  
} 

// Function used to get moon phase image from NASA
async function getMoonImage() {
    // Get todays date
    let date = new Date();
    let currentDate =
        `${date.getFullYear()}-` +
        `${String(date.getMonth() + 1).padStart(2, '0')}-` +
        `${String(date.getDate()).padStart(2, '0')}T00:00`;


    // Make API call
    const URL = `https://svs.gsfc.nasa.gov/api/dialamoon/${currentDate}`;
    try {
        const response = await fetch(URL);

        if (response.ok) {
            var data = await response.json();
            // console.log(data);
            return data.image.url;
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error:', error);
    }  
}


// Function used to start weather retrieval
export async function startWeatherRetrieval(locationData) {
    // Create header, nws requires this
    console.log('getting weather');
    const headers = {
        user_agent: 'simpleWeatherSite'
    }
    // Base endpoint
    const BASE_URL = 'https://api.weather.gov';
    // endpoint with location coordinates
    let nwsURL = `${BASE_URL}/points/${locationData.lat},${locationData.lon}`;
    // retrieve first set of needed data

    let data = await makeNWSRequest(nwsURL);
    if (data) {
        // Get the needed urls from NWS
        let timeZone = data.properties.timeZone;
        let forecastURL = data.properties.forecast;
        let forecastHourlyURL = data.properties.forecastHourly;
        let stationsURL = data.properties.observationStations;

        
        // Get each part of data
        let currentData = await nwsCurrentConditions(stationsURL, BASE_URL, headers);
        let dailyForecastData = await nwsDailyForecast(forecastURL);
        let hourlyForecastData = await nwsHourlyForecast(forecastHourlyURL);
        let sunData = await getSunData(locationData.lon, locationData.lat, data);
        let moonImage = await getMoonImage();
        let moonPhase = determineMoonPhase();

       
        // Return all the data in one object
        return {location: locationData.name, current: currentData, dailyForecast: dailyForecastData, hourlyForecast: hourlyForecastData, 
                sun: sunData, moonImage: moonImage, moonPhase: moonPhase};
    } else {
        console.log('could not retrieve data')
    }
}