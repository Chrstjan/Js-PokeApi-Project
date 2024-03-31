//#region GLOBALS
const app = document.getElementById("app");

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
      console.log(json);
    })
    .catch((error) => {
      console.log("Error fetching pokemon data:", error);
    });
}
//#endregion model code

//#region controller code

//#endregion controller code

//#region view code

//#endregion view code
