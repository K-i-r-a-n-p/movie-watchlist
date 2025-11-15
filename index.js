let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []
const movieSearch = document.getElementById("movie-search")
const searchBtn = document.getElementById("search-btn")
const emptyState = document.getElementById("empty-state")
const moviesContainer = document.getElementById("movies-container")
let moviesData = []

searchBtn.addEventListener("click", async () => {
    emptyState.style.display = "none" 
    moviesData = []

    const res = await fetch(
        `https://www.omdbapi.com/?i=tt3896198&apikey=d898f87a&s=${movieSearch.value.replaceAll(" ", "+")}` 
    )
    const data = await res.json()
    const moviesHTML = await Promise.all(
        data.Search.map(async movieId => {
    const response = await fetch(
        `https://www.omdbapi.com/?i=tt3896198&apikey=d898f87a&t=${movieId.Title.replaceAll(" ", "+")}`
    )
    const movie = await response.json()

    moviesData.push({
        title: movie.Title,
        rating: movie.imdbRating,
        runtime: movie.Runtime,
        genre: movie.Genre,
        plot: movie.Plot,
        poster: movie.Poster
    })
    return `
        <div class="movie-card">
            <img class="movie-poster" src="${movie.Poster}" alt="${movie.Title}">
            <div class="movie-info">
                <div class="movie-header">
                    <h2 class="movie-title">${movie.Title}</h2>
                    <span class="movie-rating">⭐ ${movie.imdbRating}</span>
                    <span class="watchlist-btn">🤍 Watchlist</span>
                </div>
                <p class="movie-meta">${movie.Runtime} --- ${movie.Genre}</p>
                <p class="movie-description">${movie.Plot}</p>
            </div>
        </div>
        <hr class="movie-divider">
    `
    })
    )
     moviesContainer.innerHTML = moviesHTML.join("")
     document.querySelectorAll(".watchlist-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const movie = moviesData[index];
        const exists = watchlist.some(item => item.title === movie.title);
        if (!exists) {
            watchlist.push(movie);
            saveWatchlist();
            btn.textContent = "❤️ Added";
        } else {
            btn.textContent = "✔ Already Added";
        }
        })
    })
})

watch.addEventListener("click",() =>{
    
})

function saveWatchlist() {
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
}