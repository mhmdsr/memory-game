const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const squareSize = 100;
const squares = [
    { x: 100, y: 100, color: 'gray' },
    { x: 280, y: 100, color: 'gray' },
    { x: 100, y: 280, color: 'gray' },
    { x: 280, y: 280, color: 'gray' }
];

const colors = ['red', 'green', 'blue', 'yellow'];
let targetSquareIndex = 0;
let targetColor = '';
let playerScore = 0;

function drawSquare(square) {
    ctx.beginPath();
    ctx.rect(square.x, square.y, squareSize, squareSize);
    ctx.fillStyle = square.color;
    ctx.fill();
    ctx.closePath();
}

function drawSquares() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    squares.forEach(drawSquare);
}

function shuffleColors() {
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
    for (let i = 0; i < squares.length; i++) {
        squares[i].color = shuffledColors[i];
    }
}

function showColors() {
    shuffleColors();
    targetSquareIndex = Math.floor(Math.random() * squares.length);
    targetColor = squares[targetSquareIndex].color;
    document.getElementById("targetColor").innerText = `Target Color: ${targetColor}`;
    drawSquares();
    var divtohide = document.getElementById('targetcolor');
    divtohide.style.display = 'none';

    setTimeout(() => {
        squares.forEach(square => square.color = 'gray');
        drawSquares();
        enableUserInput();
        divtohide.style.display = 'block';
    }, 5000);
}

function enableUserInput() {
    canvas.addEventListener('click', handleUserInput);
    canvas.addEventListener('touchstart', handleUserInput);
}

function disableUserInput() {
    canvas.removeEventListener('click', handleUserInput);
    canvas.removeEventListener('touchstart', handleUserInput);
}

function handleUserInput(event) {
    disableUserInput();

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX || event.touches[0].clientX) - rect.left;
    const y = (event.clientY || event.touches[0].clientY) - rect.top;

    const clickedIndex = squares.findIndex(square =>
        x > square.x && x < square.x + squareSize &&
        y > square.y && y < square.y + squareSize
    );

    if (clickedIndex === targetSquareIndex) {
        playerScore++;
        document.getElementById('score').innerText = `Score: ${playerScore}`;
        showColors();
    } else {
        alert(`GAME OVER! Your score: ${playerScore}`);
        endGame();
    }
}

function startGame() {
    playerScore = 0;
    document.getElementById('score').innerText = `Score: ${playerScore}`;
    document.getElementById('startButton').style.display = 'none';
    showColors();
}

function endGame() {
    document.getElementById('startButton').innerText = 'Restart Game';
    document.getElementById('startButton').style.display = 'block';
}

drawSquares();
