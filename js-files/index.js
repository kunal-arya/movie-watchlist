// fetch("http://www.omdbapi.com/?apikey=6951e4d&")
//     .then(response => response.json())
//     .then(data => console.log(data))

const inputText = document.querySelector(`input[type="text"]`);
const searchBtn = document.querySelector(`.search-btn`);
const movieList = document.querySelector("#movie-lists");
const startText = document.querySelector(".start-text");
let movieArr;

async function searchBtnClickHandler() {
    const movieSearch = inputText.value.toLowerCase();
    
    // If someone press search without writing anything
    if(movieSearch === "") {
        return;
    }


    const response = await fetch(`https://www.omdbapi.com/?apikey=6951e4d&s="${movieSearch}`);
    const data = await response.json();

    // To clear the starting text of movieList and movieList
    startText.classList.add("start-hide");  
    startText.innerHTML = "";
    movieList.innerHTML = "";

    const watchlistMovies = JSON.parse(localStorage.getItem("movie"));
    console.log(watchlistMovies);

    // if movie don't found
    if(data.Response == "False") {
        startText.classList.remove("start-hide");
        startText.innerHTML = "Unable to find what you're looking for. Please try another search.";
    } else {

        // If movie is found
        for(let details of data.Search) {
            const response = await fetch(`https://www.omdbapi.com/?apikey=6951e4d&i=${details.imdbID}&page=1-4`);
            const movie = await response.json();

            let inWatchlist = false;

            // only if watchlistMovies is a truthy
            if(watchlistMovies) {
                watchlistMovies.forEach(movie => {
                    if(movie.imdbID == details.imdbID) {
                        inWatchlist = true;
                        return;
                    }
                })
            }

            if(!inWatchlist) {
                movieList.innerHTML += 
                `<div class="movie-card">
                    <img class="movie-image" src="${movie.Poster}">
                    <div class="movie-head">
                        <h3 class="title">${movie.Title}</h3>
                        <p class="stars">⭐${movie.imdbRating}</p>
                    </div>
                    <p class="length">${movie.Runtime}</p>
                    <p class="genre">${movie.Genre}</p>
                   <div class="watchList-btns" id="">
                        <button onclick="watchListClickHandler(this.classList)" class="${details.imdbID} watchlist-icon ">
                            <img src="./icons/plus.svg" alt="plus icon"> <p>Watchlist</p>
                        </button>
                        <button onclick="RemoveClickHandler(this.classList)" class=" ${details.imdbID} watchlist-icon watchlist-hide">
                            <img src="./icons/minus.svg" alt="minus icon"> <p>Remove</p>
                        </button>
                    </div>
                    <p class="plot"> ${movie.Plot} </p>
                </div>`
            } else {
                movieList.innerHTML += 
                `<div class="movie-card">
                    <img class="movie-image" src="${movie.Poster}">
                    <div class="movie-head">
                        <h3 class="title">${movie.Title}</h3>
                        <p class="stars">⭐${movie.imdbRating}</p>
                    </div>
                    <p class="length">${movie.Runtime}</p>
                    <p class="genre">${movie.Genre}</p>
                   <div class="watchList-btns" id="">
                        <button onclick="watchListClickHandler(this.classList)" class="${details.imdbID} watchlist-icon watchlist-hide">
                            <img src="./icons/plus.svg" alt="plus icon"> <p>Watchlist</p>
                        </button>
                        <button onclick="RemoveClickHandler(this.classList)" class=" ${details.imdbID} watchlist-icon ">
                            <img src="./icons/minus.svg" alt="minus icon"> <p>Remove</p>
                        </button>
                    </div>
                    <p class="plot"> ${movie.Plot} </p>
                </div>`
            }


        }
    }
}

async function watchListClickHandler(id) {
    const movieId = id[0];
    const watchList = document.querySelectorAll(`.${movieId}`)[0];
    const remove = document.querySelectorAll(`.${movieId}`)[1];
    watchList.classList.add("watchlist-hide");
    remove.classList.remove("watchlist-hide");

    const response = await fetch(`https://www.omdbapi.com/?apikey=6951e4d&i=${movieId}&page=1-4`);
    const movie = await response.json();

    let localMovie = localStorage.getItem("movie");

    if(localMovie == null) {
        movieArr = [];
    } else {
        movieArr = JSON.parse(localMovie);
    }

    movieArr.push(movie);

    localStorage.setItem("movie",JSON.stringify(movieArr));
}

async function RemoveClickHandler(id) {
    const movieId = id[0];
    const watchList = document.querySelectorAll(`.${movieId}`)[0];
    const remove = document.querySelectorAll(`.${movieId}`)[1];
    watchList.classList.remove("watchlist-hide");
    remove.classList.add("watchlist-hide");

    const response = await fetch(`https://www.omdbapi.com/?apikey=6951e4d&i=${movieId}&page=1-4`);
    const movie = await response.json();

    let localMovie = localStorage.getItem("movie");

    movieArr = JSON.parse(localMovie);

    // IF movieArr is empty
    if(!movieArr) {
        return;
    }

    let removeIndex;

    for(let i = 0; i < movieArr.length; i++ ) {
        if(movieArr[i].imdbID == movieId) {
            removeIndex = i;
            break;
        }
    }

    movieArr.splice(removeIndex,1);

    localStorage.setItem("movie",JSON.stringify(movieArr));
}

searchBtn.addEventListener("click", searchBtnClickHandler);





  

