const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 8 // para melhor visualização, utilizando multiplos de 4
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <button onclick="Pokemondetalhes(${pokemon.number})" class="detalhelink">Detalhes</a>
            <section id="detalhes ${pokemon.number}" class="detalhe">

            </section>

        </li>
    `
}

//TODO
function Pokemondetalhes(number){
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`
    fetch(url).then((response) => response.json())
    .then((jsonBody) => "Altura: " + jsonBody.height/10+"m" +"<br>Peso: " + jsonBody.weight/10+"kg")
    .then((results) => document.getElementById(`detalhes ${number}`).innerHTML = results)

}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})