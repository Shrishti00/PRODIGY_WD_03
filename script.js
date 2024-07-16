const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

document.getElementById('reset-button').addEventListener('click', resetGame);

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== '' || checkWinner()) {
        return;
    }

    makeMove(cellIndex, currentPlayer);

    if (!checkWinner() && !isDraw()) {
        currentPlayer = 'O';
        aiMove();
        currentPlayer = 'X';
    }
}

function makeMove(index, player) {
    gameState[index] = player;
    cells[index].textContent = player;

    if (checkWinner()) {
        setTimeout(() => alert(`${player} wins!`), 100);
    } else if (isDraw()) {
        setTimeout(() => alert('Draw!'), 100);
    }
}

function aiMove() {
    const emptyCells = gameState
        .map((value, index) => (value === '' ? index : null))
        .filter(index => index !== null);

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex, 'O');
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

function isDraw() {
    return gameState.every(cell => cell !== '');
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}
