const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");

  // Очищаем предыдущие фильмы
  document.querySelector(".movies").innerHTML = "";

  data.films.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <div class="movie__cover-inner">
        <img
          src="${movie.posterUrlPreview}"
          class="movie__cover"
          alt="${movie.nameRu}"
        />
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map(
          (genre) => ` ${genre.genre}`
        )}</div>
        ${
          movie.rating &&
          `
        <div class="movie__average movie__average--${getClassByRate(
          movie.rating
        )}">${movie.rating}</div>
        `
        }
      </div>
        `;
    moviesEl.appendChild(movieEl);
  });
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});

// if you have any suggestion of questions, pleasse feel free to send me an email to chiholiu10@gmail.com

(function() {
  "use strict";

  function Pagination() {
    
     const objJson = this.showMovies

    const prevButton = document.getElementById('button_prev');
    const nextButton = document.getElementById('button_next');
    const clickPageNumber = document.querySelectorAll('.clickPageNumber');
    
    let current_page = 1;
    let records_per_page = 5;
    
    this.init = function() {
        changePage(1);
        pageNumbers();
        selectedPage();
        clickPage();
        addEventListeners();
   }
    
    let addEventListeners = function() {
        prevButton.addEventListener('click', prevPage);
        nextButton.addEventListener('click', nextPage);   
    }
          
    let selectedPage = function() {
        let page_number = document.getElementById('page_number').getElementsByClassName('clickPageNumber'); 
        for (let i = 0; i < page_number.length; i++) {
            if (i == current_page - 1) {
                page_number[i].style.opacity = "1.0";
            } 
            else {
                page_number[i].style.opacity = "0.5";
            }
        }   
    }  
    
    let checkButtonOpacity = function() {
      current_page == 1 ? prevButton.classList.add('opacity') : prevButton.classList.remove('opacity');
      current_page == numPages() ? nextButton.classList.add('opacity') : nextButton.classList.remove('opacity');
    }

    let changePage = function(page) {
        const listingTable = document.getElementById('listingTable');

        if (page < 1) {
            page = 1;
        } 
        if (page > (numPages() -1)) {
            page = numPages();
        }
     
        listingTable.innerHTML = "";

        for(var i = (page -1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
            listingTable.innerHTML += "<div class='objectBlock'>" + objJson[i].adName + "</div>";
        }
        checkButtonOpacity();
        selectedPage();
    }

    let prevPage = function() {
        if(current_page > 1) {
            current_page--;
            changePage(current_page);
        }
    }

    let nextPage = function() {
        if(current_page < numPages()) {
            current_page++;
            changePage(current_page);
        } 
    }

    let clickPage = function() {
        document.addEventListener('click', function(e) {
            if(e.target.nodeName == "SPAN" && e.target.classList.contains("clickPageNumber")) {
                current_page = e.target.textContent;
                changePage(current_page);
            }
        });
    }

    let pageNumbers = function() {
        let pageNumber = document.getElementById('page_number');
            pageNumber.innerHTML = "";

        for(let i = 1; i < numPages() + 1; i++) {
            pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
        }
    }

    let numPages = function() {
        return Math.ceil(objJson.length / records_per_page);  
    }
 }
let pagination = new Pagination();
pagination.init();
})();

