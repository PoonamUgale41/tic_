let min = 1;
let max = 100;
let randomNumber;
let attempts;
let score = 0;
let time = 0;
let timerInterval;
let gameOver;

function startGame() {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    attempts = 0;
    time = 0;
    gameOver = false;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        time++;
        document.getElementById("timer").textContent = `⏱ Time: ${time}s`;
    }, 1000);

    document.getElementById("rangeText").textContent =
        `Guess a number between ${min} and ${max}`;

    document.getElementById("message").textContent = "";
    document.getElementById("attempts").textContent = "";
    document.getElementById("guessInput").value = "";
}

function setDifficulty() {
    const level = document.getElementById("difficulty").value;

    if (level === "easy") max = 50;
    else if (level === "medium") max = 100;
    else max = 200;

    startGame();
}

function checkGuess() {
    if (gameOver) return;

    const guess = Number(document.getElementById("guessInput").value);
    const message = document.getElementById("message");

    if (!guess || guess < min || guess > max) {
        message.textContent = `⚠️ Enter number between ${min} and ${max}`;
        return;
    }

    attempts++;

    if (guess === randomNumber) {
        clearInterval(timerInterval);
        message.textContent = "🎉 Correct!";

        // Score calculation
        let points = Math.max(100 - (attempts * 5 + time), 10);
        score += points;

        document.getElementById("score").textContent = `🏆 Score: ${score}`;
        gameOver = true;
    }
    else if (guess < randomNumber) {
        message.textContent = "📉 Too low!";
    }
    else {
        message.textContent = "📈 Too high!";
    }

    document.getElementById("attempts").textContent = `Attempts: ${attempts}`;
}

function restartGame() {
    startGame();
}

// Start game on load
startGame();