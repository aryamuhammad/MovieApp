// TMDB
const APIKEY = "69de209a9e8ad05d761b114410a990b5";
const baseURL = "https://api.themoviedb.org/3";
const apiURL =
  baseURL + `/discover/movie?api_key=${APIKEY}&sort_by=popularity.desc&page=1`;
const row = document.querySelector(".row");
const imgSRC = "https://image.tmdb.org/t/p/w500/";

// Fetch API
let getDataMovie = async (url) => {
  let response = await fetch(url);
  let movies = await response.json();
  let data = movies.results;
  // console.log(data);
  showData(data);
};
getDataMovie(apiURL);
// Tampilkan film
function showData(data) {
  data.forEach((film) => {
    // Date
    const date = new Date(film.release_date);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var tahun = date.getFullYear();
    var bulan = months[date.getMonth() + 1];

    var tanggal = date.getDate();

    var myDate = tanggal + " " + bulan + " " + tahun;

    // Card Movie
    let cardContainer = document.createElement("div");
    cardContainer.classList.add("col-md-4");
    cardContainer.classList.add("d-flex");
    cardContainer.classList.add("justify-content-center");
    cardContainer.classList.add("mt-5");
    cardContainer.innerHTML = `
            <div class="card shadow-sm" style="width: 18rem">
            <img src="${
              imgSRC + film.poster_path
            }" class="card-img-top" alt="..." />
            <div class="card-body">
              <div
                class=" title-rating container d-flex justify-content-between align-items-start px-0 py-1"
              >
                <h5 class="card-title movie-title">${film.title}</h5>
                <div class="rating align-items-center">${
                  film.vote_average
                }</div>
              </div>
              <p class="card-text release-date">${myDate}</p>
            </div>
          </div>
            `;
    row.appendChild(cardContainer);
  });
}

// Search
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  row.innerHTML = "";
  const searchQuery = document.querySelector("input").value;
  searchQuery.value = "";
  const btnSubmit = document.querySelector(".btnSubmit");
  if (searchQuery) {
    getDataMovie(
      // row.innerHTML = "";
      baseURL + `/search/movie?api_key=${APIKEY}&query=${searchQuery}&page=1`
    );
  } else if (searchQuery == "") {
    alert("Please input movie title");
    getDataMovie(apiURL);
  } else {
    getDataMovie(apiURL);
  }
});
