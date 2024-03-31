//#region GLOBALS
const app = document.getElementById("app");

let allPokemon = null;
let randFeatuedPokemon = [];
let clickedPokemon = [];

//Calling functions
function initApp() {
  getPokemonData();
}
initApp();
//#endregion GLOBALS

//#region model code
function getPokemonData() {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((json) => {
      recivedPokemonData(json);
    })
    .catch((error) => {
      console.log("Error fetching pokemon data:", error);
    });
}

function getClickedPokemonData(pokemonId) {
  fetch(`${pokemonId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok. Could not find pokemon");
      }
      return res.json();
    })
    .then((json) => {
      recivedClickedPokemon(json);
    })
    .catch((error) => {
      console.log("could not find pokemon:", error);
    });
}
//#endregion model code

//#region controller code
function recivedPokemonData(pokemonData) {
  console.log(pokemonData);
  allPokemon = pokemonData.results;

  randFeatuedPokemon.push(
    allPokemon[Math.floor(Math.random() * allPokemon.length)],
    allPokemon[Math.floor(Math.random() * allPokemon.length)],
    allPokemon[Math.floor(Math.random() * allPokemon.length)]
  );
  //   console.log(randFeatuedPokemon);
  buildFeaturedPokemons(randFeatuedPokemon);
}

function recivedClickedPokemon(pokemonData) {
  //   console.log(pokemonData);
  clickedPokemon.push(pokemonData);

  //buildPokemoncard(clickedPokemon);
}

function pokecardCallback(clickedPokecard) {
  //   console.log(clickedPokecard);
  getClickedPokemonData(clickedPokecard);
}
//#endregion controller code

//#region view code
function buildFeaturedPokemons(pokemons) {
  let pokemonCardContainer = document.createElement("div");
  pokemonCardContainer.classList.add("card-container");

  pokemons.forEach((pokemon) => {
    let pokemonCard = `
    <figure class="pokemon-card" onclick="pokecardCallback('${pokemon.url}')">
        <header>
            <h3>${pokemon.name}</h3>
        </header>
    </figure>`;

    pokemonCardContainer.innerHTML += pokemonCard;
  });

  app.appendChild(pokemonCardContainer);
}

//#endregion view code
