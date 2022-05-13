const buttonAddon2 = document.getElementById("button-addon2");
const searchBar = document.getElementById("search-bar");

buttonAddon2.addEventListener("click", () => {
    console.log(searchBar.value);
    searchWeather(searchBar.value)
})

const searchWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c6b9cae3971468363aaabf7e422d6a7e`
    const res = await fetch(url);
    const data = await res.json();
    displayWeather(data)
}
searchWeather('dhaka');

const displayWeather = (weather) => {
    console.log(weather);
    const weatherDiv = document.getElementById("weatherCard");
    weatherDiv.innerHTML = `<div class="card-body text-center">
    <i class="${iconSelector(weather.weather[0].main)} text-center"></i>
    <p class="card-text"><strong>${weather.name}</strong></p>
    <p class="card-text temp"><strong>${Math.round(Math.abs(weather.main.temp - 273.15))}</strong></p>
    <p class="card-text"><strong>${weather.weather[0].main}</strong></p>
</div>`
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
}