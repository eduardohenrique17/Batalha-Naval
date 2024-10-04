let board = [];
let hits = 0; // Para contar os acertos
let misses = 0; // Para contar os erros
let gameStarted = false;
const boardSize = 5; // Tamanho da matriz (5x5)
const scoreContainer = document.querySelector('.score');
const hitsDisplay = document.getElementById('hits-score');
const missesDisplay = document.getElementById('misses-score');
const gameBoard = document.getElementById('game-board');

document.addEventListener('DOMContentLoaded', () => {
    initializeGame();

    document.getElementById('easy-btn').addEventListener('click', () => {
        initializeGame(10); // Dificuldade fácil (10 barcos)
    });

    document.getElementById('hard-btn').addEventListener('click', () => {
        initializeGame(7); // Dificuldade difícil (7 barcos)
    });

    document.getElementById('start-btn').addEventListener('click', restartGame);
});

function initializeGame(numBoats = 3) {
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill('agua'));
    hits = 0; // Reinicia os acertos
    misses = 0; // Reinicia os erros
    scoreContainer.style.display = 'none';
    hitsDisplay.textContent = hits;
    missesDisplay.textContent = misses;
    gameStarted = false;

    createBoard();
    placeBoats(numBoats);
}

function createBoard() {
    gameBoard.innerHTML = ''; // Limpa o tabuleiro anterior
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => handleCellClick(row, col));
            gameBoard.appendChild(cell);
        }
    }
}

function placeBoats(numBoats) {
    let placedBoats = 0;
    while (placedBoats < numBoats) {
        const row = Math.floor(Math.random() * boardSize);
        const col = Math.floor(Math.random() * boardSize);
        if (board[row][col] === 'agua') {
            board[row][col] = 'barco'; // Coloca um barco
            placedBoats++;
        }
    }
}

function handleCellClick(row, col) {
    if (!gameStarted) {
        gameStarted = true;
        scoreContainer.style.display = 'block';
    }
    
    const cell = gameBoard.children[row * boardSize + col];
    
    // Verifica se é um tiro em água ou em barco
    if (board[row][col] === 'agua') {
        board[row][col] = 'tiro'; // Marca como tiro
        cell.innerHTML = '<img src="water.jpg" alt="Água">'; // Imagem de água
        misses++; // Incrementa os erros
    } else if (board[row][col] === 'barco') {
        board[row][col] = 'tiro'; // Marca como tiro
        cell.innerHTML = '<img src="navio ataque.png" alt="Barco">'; // Imagem de barco
        hits++; // Incrementa os acertos
    }

    // Atualiza as exibições
    hitsDisplay.textContent = hits;
    missesDisplay.textContent = misses;
}

function restartGame() {
    initializeGame();
}
