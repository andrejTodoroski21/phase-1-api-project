const pokedex = document.getElementById('pokedex');

const fetchPokemon = async () => {
    // function to fetch the url and converts it to json
    const url = `https://pokeapi.co/api/v2/pokemon?limit=1025`;
    const res = await fetch(url);
    const data = await res.json();
    //using map to 
    const pokemon = data.results.map((result, index) =>
    ({
        ...result,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    }));
       displayPokemon(pokemon)
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon.map(pokeman => `
        <li class="card" onclick ="selectPokemon(${pokeman.id})">
            <img class="card-image" src="${pokeman.image}" />
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            
        </li>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    displayPopUp(pokeman)
}

const displayPopUp = (pokeman) => {
    //takes the name of the types and put them together and separates them with a comma
    const type = pokeman.types.map((type) => type.type.name).join(', ');
    const image = pokeman.sprites['front_default']
    const htmlString = `
        <div class = "popup">
            <button id = "closeBtn" onclick = "closePopUp()">Close</button> 
            <div class="card">
                <img class="card-image" src="${image}" />
                <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
                <p><small>Height: </small> ${pokeman.height} | <small> Weight: </small> ${pokeman.weight} | <small>Type: </small> ${type}</p>
            </div>
        </div>
    `;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
    console.log(htmlString)
};
const closePopUp = () => {
    const popup = document.querySelector('.popup')
    popup.parentElement.removeChild(popup)
}

const addEventListenersToCards = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('bounce-animation');
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('bounce-animation');
        });
    });
};

fetchPokemon();