const watchListMovies = document.getElementById("watchlist-container")
const watchlistEmptyState = document.getElementById("watchlist-empty-state")
let html = ""
const watchLists = JSON.parse(localStorage.getItem("watchlist")) || []
if(watchLists.length){
    console.log(watchLists)
    watchlistEmptyState.style.display = "none"
    watchLists.forEach(item => {
        html += `<div class="movie-card">
        <img class="movie-poster" src="${item.poster}" alt="${item.title}">
        <div class="movie-info">
            <div class="movie-header">
                <h2 class="movie-title">${item.title}</h2>
                <span class="movie-rating">⭐ ${item.rating}</span>
                <span class="remove-btn">➖ Remove</span>
            </div>
            <p class="movie-meta">${item.runtime} --- ${item.genre}</p>
            <p class="movie-description">${item.plot}</p>
        </div>
    </div>
    <hr class="movie-divider">`
    })
    watchListMovies.innerHTML = html
    
    document.querySelectorAll(".remove-btn").forEach((btn, index) => {
            btn.addEventListener("click", () => {
                watchLists.splice(index, 1);
                localStorage.setItem("watchlist", JSON.stringify(watchLists));
                location.reload();
            });
        });
}