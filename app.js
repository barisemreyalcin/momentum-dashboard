const authorEl = document.getElementById("author");

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=city&query=view&query=nature")
    .then(response => response.json())
    .then(data => {
        console.log(data.urls.regular);
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
        authorEl.textContent = `By: ${data.user.name}`;
    })
    .catch(error => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1473059299523-3ee06d1b88db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxMjQ5NTN8&ixlib=rb-4.0.3&q=80&w=1080)`;
        // to set a default background image
    })