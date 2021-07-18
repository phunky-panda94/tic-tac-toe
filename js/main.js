import { gameBoard, PlayerFactory } from "./objects.js";

const board = document.querySelector('.board');
const squares = document.querySelectorAll('.square');
const message = document.querySelector('.message > p');
const reset = document.getElementById('reset');

const playerA = PlayerFactory('Player A', 'x')
const playerB = PlayerFactory('Player B', 'o');

let activePlayer;

function startGame() {

    // Player A starts

    playerA.active = true; 
    activePlayer = playerA
    board.classList.toggle(activePlayer.marker);

    message.textContent = `${activePlayer.name}, it's your turn!`;

}

function checkWinner() {

    // check if there are any winning combinations
    return gameBoard.winningCombinations.some(combination => {

        // loop over combinations and check if all squares of winning combinations contain same marker
        return combination.every(index => {
            
            return squares[index].classList.contains(activePlayer.marker);
        
        })

    })

}

function handleClick(e) {

    // Add mark to square
    e.target.classList.add(activePlayer.marker);

    // Check for winner
    if (checkWinner()) {

        console.log('someone won!')
        message.textContent = `${activePlayer.name} wins!`;
        return;

    } 
    
    // TODO: check if tie

    // Change player
    swapPlayer();

    // Update message
    message.textContent = `${activePlayer.name}, it's your turn!`;

}

function swapPlayer() {

    if (playerA.active) {

        playerB.active = true;
        activePlayer = playerB;
        playerA.active = false;

    } else {

        playerA.active = true;
        activePlayer = playerA;
        playerB.active = false;

    }

    board.classList.toggle(playerA.marker);
    board.classList.toggle(playerB.marker);

}

// Event listeners
squares.forEach(square => {

    square.addEventListener('click', handleClick, { once: true });

});

reset.addEventListener('click', () => {

    squares.forEach(square => {

        square.classList.remove('x');
        square.classList.remove('o');
        square.addEventListener('click', handleClick, { once: true });

    });

    message.textContent = `Player A, it's your turn!`;

});

startGame();