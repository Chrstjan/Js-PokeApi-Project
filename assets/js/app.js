//#region GLOBALS
const app = document.getElementById("app");

let allPokemon = null;
let randFeatuedPokemon = [];

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
//#endregion controller code

//#region view code
function buildFeaturedPokemons(pokemons) {
  let pokemonCardContainer = document.createElement("div");
  pokemonCardContainer.classList.add("card-container");

  pokemons.forEach((pokemon) => {
    let pokemonCard = `
    <figure class="pokemon-card">
        <header>
            <h3>${pokemon.name}</h3>
        </header>
    </figure>`;

    pokemonCardContainer.innerHTML += pokemonCard;
  });

  app.appendChild(pokemonCardContainer);
}

//#endregion view code
