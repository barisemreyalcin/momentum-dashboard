const authorEl = document.getElementById("author");

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=view")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
        authorEl.textContent = `By: ${data.user.name}`;
    })