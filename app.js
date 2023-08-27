const authorEl = document.getElementById("author");
const cryptoHeaderEl = document.getElementById("crypto-header");
const cryptoDataEl = document.getElementById("crypto-data");
const timeEl = document.getElementById("time");
const weatherEl = document.getElementById("weather");

// background image
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=view&query=nature&query=city&query=sky&query=space&query=architecture")
    .then(response => response.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
        authorEl.textContent = `By: ${data.user.name}`;
    })
    .catch(error => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1473059299523-3ee06d1b88db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxMjQ5NTN8&ixlib=rb-4.0.3&q=80&w=1080)`;
        // to set a default background image
    })

// coin section
fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(response => {
        if(!response.ok) {
            throw Error("Something went wrong");
        }
        return response.json();
    })
    .then(data => {
        cryptoHeaderEl.innerHTML = `
            <img src=${data.image.small}>
            <span>${data.name}</span>
        `
        cryptoDataEl.innerHTML = `
            <p id="current" class="data">
                <img src="img/current.png">
                <span>${data.market_data.current_price.try} TRY</span>
            </p>
            <p id="down" class="data">
                <img src="img/up.png">
                <span>${data.market_data.high_24h.try} TRY</span>
            </p>
            <p id="up" class="data">
                <img src="img/down.png">
                <span>${data.market_data.low_24h.try} TRY</span>
            </p>
        `
    })
    .catch(error => console.log(error))

// display current time
function getTime() {
    const date = new Date();
    const time = date.toLocaleTimeString("en-US", {timeStyle: "short"});
    timeEl.textContent = time
} 
setInterval(getTime, 1000);

// weather
navigator.geolocation.getCurrentPosition((position) => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
    .then(response => {
        if(!response.ok) {
            throw Error("Weather data is not available")
        } else {
            return response.json();
        }
    })
    .then(data => {
        console.log(data)
        const weatherIconUrl = "https://openweathermap.org/img/wn/01d@2x.png";
        weatherEl.innerHTML = `
            <div id="weather-info">
                <img src=${weatherIconUrl}>
                <span>${Math.round(data.main.temp)}°<span>
            </div>
            <div id="city">
                <span>${data.name}<span>
            </div>
        `
    })
    .catch(err => console.log(err))
});
