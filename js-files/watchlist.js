const movieLists = document.querySelector(".movies-show");

// showMovies
showMovies();


function RemoveClickHandler(id) {
    const movieId = id[0];
    
    let movies = localStorage.getItem("movie");
    let movieArr = JSON.parse(movies);

    let removeIndex;
    for(let i = 0; i < movieArr.length ; i++) {
        if(movieArr[i].imdbID == movieId) {
            removeIndex = i;
            break; 
        }
    }

    movieArr.splice(removeIndex,1);

    localStorage.setItem("movie", JSON.stringify(movieArr));

    showMovies();
}


function showMovies() {
    let movies= localStorage.getItem("movie");
    let movieArr = JSON.parse(movies);
    
    // if movies Array is blank
    if(!movieArr) {
        movieLists.innerHTML = `
        <div class="container">
            <p>Your watchlist is looking a little empty...</p>
        </div>
        <a href="./index.html"class="watchlist-icon add-movies-link">
            <img src="./icons/plus.svg" alt="plus icon"> 
            <p>Let's add some movies!</p>
        </a>
        `
        return;
    }

    let html = "";
    
    for(let movie of movieArr) {
        console.log(movie);
        html += 
        `<div class="movie-card">
            <img class="movie-image" src="${movie.Poster}">
            <div class="movie-head">
                <h3 class="title">${movie.Title}</h3>
                <p class="stars">⭐${movie.imdbRating}</p>
            </div>
            <p class="length">${movie.Runtime}</p>
            <p class="genre">${movie.Genre}</p>
            <div class="watchList-btns" id="">
                <button onclick="RemoveClickHandler(this.classList)" class=" ${movie.imdbID} watchlist-icon">
                    <img src="./icons/minus.svg" alt="minus icon"> <p>Remove</p>
                </button>
            </div>
            <p class="plot"> ${movie.Plot} </p>
        </div>`
    }

    console.log(html);
    movieLists.innerHTML = html;
}