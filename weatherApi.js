const buttonAddon2 = document.getElementById("button-addon2");
const searchBar = document.getElementById("search-bar");
buttonAddon2.addEventListener("click", () => {
    // console.log(searchBar.value);
    searchWeather(searchBar.value, 0)
})
const searchWeather = async (city, isCurrentCity) => {
    let url;
    if (isCurrentCity == 0) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c6b9cae3971468363aaabf7e422d6a7e`
    }
    else {
        getLocation()
        return 0;
    }
    const res = await fetch(url);
    const data = await res.json();
    displayWeather(data)
}
searchWeather('', 1);

const displayWeather = (weather) => {
    // console.log("weather data: ", weather);
    // console.log("weather message: ", weather.message);
    const weatherDiv = document.getElementById("weatherCard");
    if (weather.name !== undefined) {
        weatherDiv.innerHTML = `<div class="card weather-card slide-in-elliptic-top-fwd"><div class=" card-body text-center">
    <i class="${iconSelector(weather.weather[0].main)} text-center"></i>
    <p class="card-text"><strong>${weather.name}</strong></p>
    <p class="card-text temp"><strong>${Math.round(Math.abs(weather.main.temp - 273.15))}℃</strong></p>
    <p class="card-text"><strong>${weather.weather[0].main}</strong></p>
</div>
</div>`
    }
    else {
        weatherDiv.innerHTML = `<div class="card-body weather-card text-center text-danger slide-in-elliptic-top-fwd">${weather.message}</div>`
    }
}

const iconSelector = (weather) => {
    if (weather === "Clear") {
        return "fas fa-solid fa-cloud"
    }
    else if (weather === "Clouds") {
        return "fas fa-solid fa-cloud-rain"
    }
    else if (weather === "Haze") {
        return "fas fa-solid fa-cloud-meatball"
    }
    else if (weather === "Rain") {
        return "fas fa-solid fa-cloud-rain"
    }
    else if (weather === "Snow") {
        return "fas fa-solid fa-cloud-snow"
    }
    else {
        return "fas fa-solid fa-cloud"
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    // console.log("lat: ", position.coords.latitude);
    // console.log("lon: ", position.coords.longitude);
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c6b9cae3971468363aaabf7e422d6a7e`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
    // const data = await res.json();
}