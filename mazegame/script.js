let timer;
let timeElapsed = 0;
let timesPlayed = 0;
let isLightMode = true;
let playerPosition = { x: 0, y: 0 };
let maze = [];
const mazeSize = 10;

function startGame() {
    const playerName = document.getElementById("nameInput").value;
    if (!playerName) {
        alert("Please enter your name.");
        return;
    }

    document.getElementById("game-title").textContent = `Maze Game - Welcome ${playerName}!`;

    // Reset timer
    timeElapsed = 0;
    document.getElementById("timer").textContent = timeElapsed;
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);

    timesPlayed += 1;
    document.getElementById("timesPlayed").textContent = timesPlayed;

    // Initialize maze and player position
    initMaze();
    playerPosition = { x: 0, y: 0 };
    renderMaze();
}

function updateTimer() {
    timeElapsed += 1;
    document.getElementById("timer").textContent = timeElapsed;
}

function initMaze() {
    // A simple maze with 1 representing walls and 0 representing paths
    maze = [
        [0, 1, 0, 0, 0, 1, 0, 1, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
        [1, 1, 0, 1, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 1, 0, 1, 1, 0]
    ];
}

function renderMaze() {
    const mazeContainer = document.getElementById("maze-container");
    mazeContainer.innerHTML = ''; // Clear previous maze

    for (let y = 0; y < mazeSize; y++) {
        for (let x = 0; x < mazeSize; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (maze[y][x] === 1) {
                cell.classList.add('wall');
            } else if (x === playerPosition.x && y === playerPosition.y) {
                cell.classList.add('player');
            } else if (x === mazeSize - 1 && y === mazeSize - 1) {
                cell.classList.add('finish');
            }
            mazeContainer.appendChild(cell);
        }
    }
}

function toggleMode() {
    if (isLightMode) {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
    }
    isLightMode = !isLightMode;
}

function endGame() {
    clearInterval(timer);

    const modal = document.getElementById("resultModal");
    const resultMessage = document.getElementById("resultMessage");
    resultMessage.textContent = `You finished the maze in ${timeElapsed} seconds!`;
    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById("resultModal").style.display = "none";
}

// Player movement and win condition
document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowUp" && playerPosition.y > 0 && maze[playerPosition.y - 1][playerPosition.x] === 0) {
        playerPosition.y -= 1;
    } else if (event.key === "ArrowDown" && playerPosition.y < mazeSize - 1 && maze[playerPosition.y + 1][playerPosition.x] === 0) {
        playerPosition.y += 1;
    } else if (event.key === "ArrowLeft" && playerPosition.x > 0 && maze[playerPosition.y][playerPosition.x - 1] === 0) {
        playerPosition.x -= 1;
    } else if (event.key === "ArrowRight" && playerPosition.x < mazeSize - 1 && maze[playerPosition.y][playerPosition.x + 1] === 0) {
        playerPosition.x += 1;
    }

    // Check if player reached the finish
    if (playerPosition.x === mazeSize - 1 && playerPosition.y === mazeSize - 1) {
        endGame();
    }

    renderMaze(); // Re-render the maze after movement
});

// Close the modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById("resultModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
