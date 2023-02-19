//Cria objeto que irá armazenar o estado da aplicação
let state = {board : [], currentGame : [], savedGames: []}



//Funções

function start(){
	readLocalStorage();
	createBoard();
	newGame();

}
//Função que pega os dados do localsotrage do navegador
function readLocalStorage(){
	if(!window.localStorage){
		return;
	}

	let savedGamesFromLocalStorage = window.localStorage.getItem('saved-games');
	
	if(savedGamesFromLocalStorage){
		state.savedGames = JSON.parse(savedGamesFromLocalStorage);
	}

}
// Função que escreve os dados no localStorage
function writeToLocalStorage(){
	window.localStorage.setItem('saved-games', JSON.stringify(state.savedGames));
}


// Função que inicia novo jogo
function newGame(){
	resetGame();
	render();
}

// Adiciona números no painel
function createBoard(){
	state.board = [];
	
	for(i = 1; i <= 60; i++){
		state.board.push(i);
		
	}
}
// Função que vai renderizar os elementos
function render(){
	renderBoard();
	renderButtons();
	renderSavedGames();
}
// Renderiza os botões
function renderButtons(){
	let divButtons = document.getElementById('megasena-buttons');
	divButtons.innerHTML = '';

	// Cria o botão de novo jogo
	let newGameButton = document.createElement('button');
	newGameButton.textContent = 'Novo Jogo';
	newGameButton.addEventListener('click', newGame);

	// Cria botão de criar jogo aleatório
	let randomGameButton = document.createElement('button');
	randomGameButton.textContent = 'Jogo aleatório';
	randomGameButton.addEventListener('click', randomGame);
	
	// Cria botão de salvar o jogo
	let saveGameButton = document.createElement('button');
	saveGameButton.textContent = 'Salvar jogo';
	saveGameButton.addEventListener('click', saveGame);
	saveGameButton.disabled = !isListComplete();

	// Adiciona os botões na divButtons
	divButtons.appendChild(newGameButton);
	divButtons.appendChild(randomGameButton);
	divButtons.appendChild(saveGameButton);
}
// Renderiza os jogos salvos
function renderSavedGames(){
	let divSavedGames = document.getElementById('megasena-saved-games');
	divSavedGames.innerHTML = '';

	if(state.savedGames.length === 0){
		divSavedGames.innerHTML= '<p> Sem jogos salvos</p>'
		divSavedGames.style= 'text-align: center'
	} else{

		divSavedGames.style= 'text-align: left'
		let ulSavedGames = document.createElement('ul');

		for(let i = 0; i < state.savedGames.length; i++){
			// Cria uma li para cada índice do array
			let liSavedGames = document.createElement('li');

			// Cria o botão para remoção do jogo
			let deleteButton = document.createElement('button');
			deleteButton.textContent = 'X';
			
			deleteButton.addEventListener('click', function(){
				deleteSavedGame(i);
			  });
			
			// Cria o texto que irá carregar os valores jogados
			let savedGameValues = document.createElement('span');
			savedGameValues.textContent = (state.savedGames[i]);

			// Insere os elementos na li

			liSavedGames.appendChild(deleteButton);
			liSavedGames.appendChild(savedGameValues);

			ulSavedGames.appendChild(liSavedGames);
		}
		divSavedGames.appendChild(ulSavedGames);

	}

}

// Vai renderizar o painel
function renderBoard(){
	let divBoard = document.getElementById('megasena-board');
	divBoard.innerHTML = '';
	
	let ulNumbers = document.createElement('ul')

	for (i = 0 ; i< state.board.length; i++){

		let liNumber = document.createElement('li');
		liNumber.textContent = state.board[i];

		liNumber.addEventListener('click', handleNumberClick);

		// Se o número já estiver selecionado ele terá a classe selected-number
		if (isNumberInGame(state.board[i])){
			liNumber.classList.add('selected-number');
		}

		ulNumbers.appendChild(liNumber);


	}
	divBoard.appendChild(ulNumbers);

}
// Função para de clicar nos números
function handleNumberClick(event){
	let numberValue = parseInt(event.currentTarget.textContent);
	
	if (isNumberInGame(numberValue)){
		
		removeNumberFromGame(numberValue);
		//console.log(state.currentGame);

	} else{
		addNumberToGame(numberValue);
		//console.log(state.currentGame);
	}
	render();
}


// Função de adição do número
function addNumberToGame(number){

	if (!isValidNumberValue(number) || isListComplete(number) || isNumberInGame(number)){
		return;
	}

	state.currentGame.push(number);
	//console.log ('Número adicionado:', number)
	return;
}

//Função de remoção do número
function removeNumberFromGame(number){

	if (!isValidNumberValue(number)){
		return;
	}

	for (i = 0 ; i < state.currentGame.length ; i++) {
		
		if (state.currentGame[i] === number){

			state.currentGame.splice(i, 1);
			//console.log('Número removido:', number);

		}
	}
}



/*As funções abaixo irão checar os números do state*/
// Testa se a lista está completa
function isListComplete(){
	if (state.currentGame.length >= 6){

		//console.error('A lista já está completa');
		return true;

	}else{
		return false;
	}
}

//Testa se o valor do número é válido
function isValidNumberValue(number){

	if (number < 1 || number > 60){
		console.error('Número inválido: ', number);
		return false;
	}
	else{
		return true;
	}

}


// Verifica se o número já foi marcado
function isNumberInGame(number){

	if (state.currentGame.includes(number)){
		return true;
	}else{
		return false;
	}
}
/*--------------------------------------------------*/
// função de salvar o jogo

function saveGame(){
	if(state.currentGame.length === 6){

		state.currentGame = sortNumbers(state.currentGame);
		
		state.savedGames.push(state.currentGame);

		writeToLocalStorage();
		newGame();


	} else{

		console.error('O jogo não está completo');

	}

	//console.log(state.savedGames)
}
function deleteSavedGame(index) {

	state.savedGames.splice(index, 1);
	
	writeToLocalStorage();
	newGame();

  }

//Limpa a lista de números
function resetGame(){
	state.currentGame = [];
}

// Cria jogo aleatrório
function randomGame(){
	resetGame();

	let i = 0;
	while (i < 6){
		number = parseInt (Math.ceil(Math.random() * 60 ));
		
		if (isNumberInGame(number)){
			continue;
		}
		
		state.currentGame.push(number)
		i++;
	}
	//console.log(state.currentGame);
	render();
}

// Essa função retorna um array numérico em ordem crescente

function sortNumbers(array) {
	return array.sort(function(a, b) {
	  return a - b;
	});
  }


start();