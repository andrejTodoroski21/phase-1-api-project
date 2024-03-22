fetch("http://localhost:3000/pokemon")
.then(response => response.json())
.then(pokemondata => {
    const pokemon = pokemondata;
    const pokemonbio = document.getElementById('pokemon-bio')

    pokemon.forEach(pokes => {
        const img = document.createElement('img')
        img.src = pokes.sprite;
        img.alt = pokes.name;
        pokemonbio.appendChild(img)
    })
})
