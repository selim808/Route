///////////////////////////  Variables  ////////////////////////////////////////////
let navLinks = document.querySelectorAll(".nav-link");
let cardsPlace = document.querySelector(".cardsPlace");
let overlay = document.querySelector(".overlay");
let gameDetails = document.querySelector(".gameDetails");

///////////////////////EventListeners////////////////////////////////////////////////
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function (e) {
    let category = e.target.getAttribute("category");
    getGames(category);
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].classList.remove("active");
    }
    e.target.classList.add("active");
  });
}
//////////////////////////////////////Functions//////////////////////////////////////

// Getting Games List/////////////////////////////////////////////////
async function getGames(category) {
  overlay.classList.remove("d-none");
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3c6fcf07ddmshd922c04f351d4a1p12785ejsn78a0d195c3dc",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    displayGames(result);
    overlay.classList.add("d-none");
  } catch (error) {
    console.error(error);
  }
}
function displayGames(result) {
  let cards = "";
  for (let i = 0; i < result.length; i++) {
    let addText = `<div class="gameID col-xl-3 col-lg-4 col-md-6 p-2"
     onclick="getGameDetails(${result[i].id})"
     gameID=${result[i].id}
     >
    <div class="card text-white" >
      <img src="${result[i].thumbnail}" class="card-img-top" alt="" />
      <div class="card-body">
        <h5 class="card-title" style="height:45px">${result[i].title}</h5>
        <p class="card-text" style="height:90px">
        ${
          result[i].short_description.length > 100
            ? result[i].short_description.slice(0, 99) + "&hellip;"
            : result[i].short_description
        }
        </p>
        <a href="${result[i].game_url}" class="btn btn-primary">Website</a>
      </div>
    </div>
  </div>`;

    cards += addText;
  }
  cardsPlace.innerHTML = cards;
}

// Getting Games Details//////////////////////////////////////////////
async function getGameDetails(id) {
  overlay.classList.remove("d-none");
  cardsPlace.classList.add("d-none");
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3c6fcf07ddmshd922c04f351d4a1p12785ejsn78a0d195c3dc",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    displayGameDetails(result);
    overlay.classList.add("d-none");
  } catch (error) {
    console.error(error);
  }
}
function displayGameDetails(result) {
  gameDetails.classList.remove("d-none");
  gameDetails.innerHTML = ` <div class="container">
  <div class="d-flex justify-content-between">
    <h1>Details Game</h1>
    <h3 role="button" onclick="detailsClose()" >X</h3>
  </div>
  <div class="d-flex">
    <div class="p-4 ps-0">
      <img src="${result.thumbnail}" />
    </div>

    <div>
      <h1>Title: ${result.title}</h1>
      <h5>Category: ${result.genre}</h5>
      <h5>Platform: ${result.platform}</h5>
      <h5>Status: ${result.status}</h5>
      <p>
      ${result.description}
      </p>
      <a href="${result.game_url}" target="_blank"><button type="button" class="btn btn-outline-warning" >
      Show Game
    </button></a>
    </div>
  </div>
</div>`;
}

// Close Game Details ////////////////////////////////////////////////
function detailsClose() {
  cardsPlace.classList.remove("d-none");
  gameDetails.classList.add("d-none");
}

getGames("MMORPG");
