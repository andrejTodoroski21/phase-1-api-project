const pokedex = document.getElementById('pokedex');

const fetchPokemon = async () => {
    // function to fetch the url and converts it to json
    const url = `https://pokeapi.co/api/v2/pokemon?limit=1025`;
    const res = await fetch(url);
    const data = await res.json();
    //using map to assign the data to the results then to the pokemon variable
    const pokemon = data.results.map((result, index) =>
    ({
        ...result,
        //pokemon are not 0 indexed so + 1
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    }));
       displayPokemon(pokemon)
};

const displayPokemon = (pokemon) => {
    // creating a variable pokemonhtmlstring and setting it equal to pokemon. 
    // then using the map function and interpolation to create iterate through pokemon and create elements with 
    // pokemon id image and name then calling .join  
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
    //when clicking on the pokemon the popup displays the shiny version
    const image = pokeman.sprites['front_shiny']
    //in the variable hmtlstring creates a div element, button(with event listener onclick),img h2 and p elements 
    //with interpolation of pokemon information like height weight and image
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
    //pokedex was defined in line one. it is a variable that document selects the ol with the id of "pokedex".
    //pokedex's inner html is set to the variable htmlstring with all the information + the inner html of pokedex
    // if it wasnt concatinated with the previous inner html then none of the information would be showing.
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
    console.log(htmlString)
};
const closePopUp = () => {
    //function that selects the div element with the class of popup and removes it
    const popup = document.querySelector('.popup')
    popup.parentElement.removeChild(popup)
}

const addEventListenersToCards = () => {
    //selects card class and uses for each to iterate through each card and add a bounce when you hover over it
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('bounce-animation');
        });
        // removes the bounce
        card.addEventListener('mouseleave', function() {
            this.classList.remove('bounce-animation');
        });
    });
};

fetchPokemon();