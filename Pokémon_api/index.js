fetch("http://localhost:3000/pokemon")
.then(response => response.json())
.then(pokemondata => {
    const pokemon = pokemondata;
    const pokemonbio = document.getElementById('pokemon-bio')

    pokemon.forEach(pokes => {
        const img = document.createElement('img')
        const p = document.createElement('p')
        const h4 = document.createElement('h4')
        const small = document.createElement('small')
        small.textContent = pokes.description
        h4.textContent = pokes.name
        p.textContent = pokes.classification;
        img.src = pokes.sprite;
        pokemonbio.appendChild(img)
        pokemonbio.appendChild(h4)
        pokemonbio.appendChild(p)
        pokemonbio.appendChild(small)
    })
    pokemon.forEach(pokes =>{
        const img = document.createElement('img')
        img.src = pokes.type
        pokemonbio.appendChild(img)
    })
})
