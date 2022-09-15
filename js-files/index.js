// fetch("http://www.omdbapi.com/?apikey=6951e4d&")
//     .then(response => response.json())
//     .then(data => console.log(data))

const inputText = document.querySelector(`input[type="text"]`);
const searchBtn = document.querySelector(`.search-btn`);
const movieList = document.querySelector("#movie-lists");
const startText = document.querySelector(".start-text");

async function searchBtnClickHandler() {
    const movieSearch = inputText.value;
    const response = await fetch(`http://www.omdbapi.com/?apikey=6951e4d&s="${movieSearch}`);
    const data = await response.json();


    // To clear the starting text of movieList and movieList
    startText.classList.add("start-hide");
    startText.innerHTML = "";
    movieList.innerHTML = "";

    // if movie don't found
    if(data.Response == "False") {
        startText.classList.remove("start-hide");
        startText.innerHTML = "Unable to find what you're looking for. Please try another search.";
    } else {

        // If movie is found
        for(let details of data.Search) {
            const response = await fetch(`http://www.omdbapi.com/?apikey=6951e4d&i=${details.imdbID}&page=1-4`);
            const movie = await response.json();
            movieList.innerHTML += 
                    `<div class="movie-card">
                        <img class="movie-image" src="${movie.Poster}">
                        <div class="movie-head">
                            <h3 class="title">${movie.Title}</h3>
                            <p class="stars">⭐${movie.imdbRating}</p>
                        </div>
                        <p class="length">${movie.Runtime}</p>
                        <p class="genre">${movie.Genre}</p>
                        <button class="watchlist-icon">
                            <img src="./icons/plus.svg" alt= "plus icon"> <p>Watchlist</p>
                        </button>
                        <p class="plot"> ${movie.Plot} </p>
                    </div>`
        }
    }
}

searchBtn.addEventListener("click", searchBtnClickHandler);





  

