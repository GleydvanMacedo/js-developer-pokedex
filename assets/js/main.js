const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

// Variavel para guardar os pokemons. para poder manda-los para outra pagina html
var arrayPokemons = [];

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <a href="./pokemon-details.html">
                <div class="detail" onclick="savePokemon(${pokemon.number})">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </a>
        </li>
    `
}

// funcao para preencher o array de pokemons
function preencheArrayPokemons(pokemon){
    arrayPokemons.push(pokemon);
}

// funcao do Onclick para passar via Localstorage o pokemon clicado para a pagina de detalhes
function savePokemon(pokemonNumber){
    const pokemonsAtual = arrayPokemons[pokemonNumber-1];
    var pokemonJson = JSON.stringify(pokemonsAtual);
    localStorage.setItem('pokemon', pokemonJson);
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemons.map(preencheArrayPokemons);
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;

        // teste para saber se o array de pokemons está correto
        console.log(arrayPokemons);
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

