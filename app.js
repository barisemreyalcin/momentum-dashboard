const authorEl = document.getElementById("author");
const cryptoHeaderEl = document.getElementById("crypto-header");
const cryptoDataEl = document.getElementById("crypto-data");

// background image
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=view&query=nature&query=city")
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
        console.log(data);
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