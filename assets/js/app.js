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
  buildPokemoncard(pokemonData);
}

function pokecardCallback(clickedPokecard) {
  //   console.log(clickedPokecard);
  getClickedPokemonData(clickedPokecard);
}

function toggleView() {
  let listElement = document.querySelector(".pokemon-stats");

  listElement.classList.toggle("hidden");
  console.log("class toggle");
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

function buildPokemoncard(pokemon) {
  console.log(pokemon);
  let pokemonType = pokemon.types
    .map((type) => `<button>${type.type.name}</button>`)
    .join("");

  let pokemonStats = pokemon.stats
    .map(
      (pokemon) =>
        `<ul><h5>${pokemon.stat.name}</h5><li>${pokemon.base_stat}</li></ul>`
    )
    .join("");

  let pokemonAbilities = pokemon.abilities
    .map((pokemon) => `<p>${pokemon.ability.name}</p>`)
    .join("");

  let pokemonCard = `
    <figure>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"/>
        <figcaption>
            <header>
                <h3>${pokemon.name}</h3>
            </header>
            <div class="pokemon-stats">
                <span class="pokemon-type">
                    <header>
                        <h4>Type</h4>
                        <button onclick="toggleView()">&darr;</button>
                    </header>
                    ${pokemonType}
                </span>

                <span class="pokemon-stat">
                  <header>
                    <h4>Stats</h4>
                    &darr;
                  </header>
                  ${pokemonStats}
                </span>

                <span class="pokemon-xp">
                  <header>
                    <h4>Base Xp</h4>
                    &darr;
                  </header>
                  <p>${pokemon.base_experience}</p>
                </span>

                <span class="pokemon-abilities">
                  <header>
                    <h4>Abilities</h4>
                    &darr;
                  </header>
                  ${pokemonAbilities}
                </span>
            </div>
        </figcaption>
    </figure>`;

  app.innerHTML = pokemonCard;
}

//#endregion view code
