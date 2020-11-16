const cardContainer = document.getElementById("card-container");
const search = document.getElementById("search");
const spinner = document.getElementById("spinner");

let pokemons = [];

search.addEventListener("input", (e) => {
  console.log(e.target.value);
  let filter = e.target.value.toUpperCase();

  let divs = cardContainer.getElementsByClassName("card");
  for (let i = 0; i < divs.length; i++) {
    let a = divs[i].getElementsByTagName("h1")[0];

    if (a) {
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        divs[i].style.display = "";
      } else {
        divs[i].style.display = "none";
      }
    }
  }
});

const pokemon = async () => {
  try {
    for (let index = 1; index < 152; index++) {
      let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`);
      let pokemon = res.data;
      let Types = [];
      pokemon.types.forEach((type) => {
        Types = [...Types, type.type.name];
      });
      pokemons = [
        ...pokemons,
        {
          name: `${pokemon.name}`,
          sprite: `${pokemon.sprites.front_default}`,
          id: `${pokemon.id}`,
          types: Types,
          height: `${pokemon.height}`,
          weight: `${pokemon.weight / 10}`,
        },
      ];
    }
    pokemons.forEach((poke) => {
      makeCard(
        poke.name,
        poke.sprite,
        poke.id,
        poke.types,
        poke.height,
        poke.weight
      );
    });
    spinner.classList.toggle("hidden");
  } catch (error) {
    console.error(error);
  }
};
pokemon();

const makeCard = (name, sprite, id, types, height, weight) => {
  let div = document.createElement("div");
  let Types = ``;
  types.forEach((type) => {
    let color = type;
    Types += `<button id="type-btn" class=${type}>${type}</button>`;
  });
  cardContainer.appendChild(div);
  div.classList.add("card");
  div.innerHTML =
    `<h1>${name}</h1>
  <img src="${sprite}"/>
  <h4>Pokédex №: ${id}</h4>
  <div id="type-container">` +
    Types +
    `</div>
  <p>Height(m): ${height}</p><p>KGs: ${weight}</p>`;
};
