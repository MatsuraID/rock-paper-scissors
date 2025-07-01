// =================================================
//                 Global Variables
// =================================================
let humanScore = 0;
let computerScore = 0;
const winningScore = 5;

// =================================================
//                 DOM Elements
// =================================================
const humanScoreDisplay = document.getElementById('human-score-display');
const computerScoreDisplay = document.getElementById('computer-score-display');
const roundResultDisplay = document.getElementById('round-result');
const gameWinnerDisplay = document.getElementById('game-winner');
const choiceButtons = document.querySelectorAll('.choice-btn');

// =================================================
//                 Event Listeners
// =================================================
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (humanScore < winningScore && computerScore < winningScore) {
            playRound(button.id);
        }
    });
});

// =================================================
//                 Game Functions
// =================================================

/**
 * Randomly returns 'rock', 'paper', or 'scissors'.
 */
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

/**
 * Plays a single round of Rock, Paper, Scissors.
 * @param {string} humanChoice - The choice of the human player.
 */
function playRound(humanChoice) {
    const computerChoice = getComputerChoice();
    let resultMessage = '';

    if (humanChoice === computerChoice) {
        resultMessage = `It's a tie! You both chose ${humanChoice}.`;
    } else if (
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock') ||
        (humanChoice === 'scissors' && computerChoice === 'paper')
    ) {
        humanScore++;
        resultMessage = `You win! ${capitalize(humanChoice)} beats ${computerChoice}.`;
    } else {
        computerScore++;
        resultMessage = `You lose! ${capitalize(computerChoice)} beats ${humanChoice}.`;
    }

    updateUI(resultMessage);
    checkForWinner();
}

/**
 * Updates the UI with the latest scores and round result.
 * @param {string} resultMessage - The message to display for the round result.
 */
function updateUI(resultMessage) {
    humanScoreDisplay.textContent = humanScore;
    computerScoreDisplay.textContent = computerScore;
    roundResultDisplay.textContent = resultMessage;
}

/**
 * Checks if a player has reached the winning score and ends the game.
 */
function checkForWinner() {
    if (humanScore === winningScore) {
        gameWinnerDisplay.textContent = 'Congratulations, you won the game!';
        gameWinnerDisplay.style.color = 'var(--secondary-color)';
        disableButtons();
    } else if (computerScore === winningScore) {
        gameWinnerDisplay.textContent = 'Game over! The computer won.';
        gameWinnerDisplay.style.color = 'var(--accent-color)';
        disableButtons();
    }
}

/**
 * Disables the choice buttons after the game is over.
 */
function disableButtons() {
    choiceButtons.forEach(button => {
        button.disabled = true;
        button.style.cursor = 'not-allowed';
        button.style.backgroundColor = '#95a5a6';
    });
}

/**
 * Helper function to capitalize the first letter of a string.
 */
function capitalize(str) {
    if (typeof str !== 'string' || str.length === 0) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}
