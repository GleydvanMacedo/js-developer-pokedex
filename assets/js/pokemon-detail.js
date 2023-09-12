const pokemonJson = localStorage.getItem('pokemon');
const pokemon = JSON.parse(pokemonJson);

const pokemonSection = document.getElementById('pokemonSection');
const detailSection = document.getElementById('detailSection');

const progressBarWidth = ['--progress-bar-width-hp','--progress-bar-width-atk','--progress-bar-width-def','--progress-bar-width-spatk','--progress-bar-width-spdef','--progress-bar-width-speed','--progress-bar-width-total'];
const progressBarColor = ['--progress-bar-color-hp','--progress-bar-color-atk','--progress-bar-color-def','--progress-bar-color-spatk','--progress-bar-color-spdef','--progress-bar-color-speed','--progress-bar-color-total'];

const totalStats = pokemon.stats.reduce((accumulator,value) => accumulator + value,0);
const totalProgressBar = ( parseInt(totalStats)/720 ) * 100;

function createPokemonSection(pokemon) {
    return `
        <div class="pokemon ${pokemon.type}">
            <div class="btnVoltar">
                <button id="btnVoltar" onclick="backPage()">Voltar</button>
            </div>
            <div class="numberName">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
            </div>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </div>
    `
}

function createDetailSection(pokemon){
    return `
        <div class="details">
            <span class="detail">Height: ${pokemon.height / 10} m</span>
            <span class="detail">Weight: ${pokemon.weight / 10} kg</span>
            <ol class="abilities">
                Abilities: ${pokemon.abilities.map((ability) => `<li class="ability">${ability}</li>`).join()}
            </ol>
        </div>

        <div class="detailStats">
            <ol class="statsList">
                <li class="stats grid-container">
                    <div class="atribute grid-item"> HP: </div>
                    <div class="atributeValue grid-item"> ${pokemon.stats[0]} </div>
                    <div id="hpProgressBar" class="progress-bar grid-item"></div>
                </li>
                <li class="stats grid-container">
                    <div class="atribute grid-item"> Attack: </div>
                    <div class="atributeValue grid-item"> ${pokemon.stats[1]} </div>
                    <div id="attackProgressBar" class="progress-bar grid-item"></div>
                </li>
                <li class="stats grid-container">
                    <div class="atribute grid-item"> Defense: </div>
                    <div class="atributeValue grid-item"> ${pokemon.stats[2]} </div>
                    <div id="defenseProgressBar" class="progress-bar grid-item"></div>
                </li>
                <li class="stats grid-container">
                    <div class="atribute grid-item"> Sp. Atk: </div>
                    <div class="atributeValue grid-item"> ${pokemon.stats[3]} </div>
                    <div id="spatkProgressBar" class="progress-bar grid-item"></div>
                </li>
                <li class="stats grid-container">
                    <div class="atribute grid-item"> Sp. Def: </div>
                    <div class="atributeValue grid-item"> ${pokemon.stats[4]} </div>
                    <div id="spdefProgressBar" class="progress-bar grid-item"></div>
                </li>
                <li class="stats grid-container">
                    <div class="atribute grid-item"> Speed: </div>
                    <div class="atributeValue grid-item"> ${pokemon.stats[5]} </div>
                    <div id="speedProgressBar" class="progress-bar grid-item"></div>
                </li>
                <li class="stats grid-container">
                    <div class="atribute grid-item"> Total: </div>
                    <div class="atributeValue grid-item"> ${totalStats} </div>
                    <div id="totalProgressBar" class="progress-bar grid-item"></div>
                </li>
            </ol>
        </div>
    `
}

function backPage() {
    localStorage.clear();
    window.history.back();    
}

//Função para pegar uma propriedade na pseudo-classe :root e alterar seu valor;
function setProperty(porperty, value){
    document.documentElement.style.setProperty(porperty, value);
}

// laço para preencher as barras de status, com exceção da ultima, com base nos valores dos status
for (let i = 0; i < progressBarWidth.length -1; i++) {
    let stats = parseInt(pokemon.stats[i]);
    setProperty(progressBarWidth[i], stats);

    if(stats <= 30){
        setProperty(progressBarColor[i], '#ff2424');
    } else if (stats <= 60){
        setProperty(progressBarColor[i], '#fefe43');
    } else {
        setProperty(progressBarColor[i], '#2ef22e');
    }
}

// bloco de codigo que preenche a ultima barra de status
setProperty(progressBarWidth[6], totalProgressBar);
if(totalProgressBar <= 30){
    setProperty(progressBarColor[6], '#6b0d0d');
} else if (totalProgressBar <= 60){
    setProperty(progressBarColor[6], '#9ea106');
} else {
    setProperty(progressBarColor[6], '#099913');
}

pokemonSection.innerHTML = createPokemonSection(pokemon);
detailSection.innerHTML = createDetailSection(pokemon);