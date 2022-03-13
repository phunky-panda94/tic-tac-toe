// create gameboard object using module pattern
const gameBoard = (() => {

        let markedSquares = [];

        const board = document.querySelector('.board');
        const squares = document.querySelectorAll('.square');

        const winningCombos = [

            [0,1,2],
            [3,4,5],
            [6,7,8],
    
            [0,3,6],
            [1,4,7],
            [2,5,8],
    
            [0,4,8],
            [2,4,6]
    
        ];

        function add(index) {
            this.markedSquares[index] = index;
        };

        function clear() {
            this.markedSquares = [];
        };

        return { markedSquares, board, squares, winningCombos, add, clear };
    
})();

// create players using factory pattern
const createPlayer = (name, marker) => {

    let _active = false;
    function toggleStatus() { _active = _active ? _active = false : _active = true };

    function getStatus() { return _active };

    function setActive(state) { _active = state };

    return { name, marker, toggleStatus, getStatus, setActive };

};

// create game object using module pattern
const game = (() => {

    const playerA = createPlayer('Player A', 'x');
    const playerB = createPlayer('Player B', 'o');

    playerA.toggleStatus();

    let activePlayer = playerA;
    gameBoard.board.classList.add(activePlayer.marker);

    // check for winner 
    function checkWinner() {

        // check if any of the winning combos apply
        return gameBoard.winningCombos.some(combo => {

            // check if all squares required for a winning combo contain the same marker
            return combo.every(index => {

                return gameBoard.squares[index].classList.contains(this.activePlayer.marker);

            });

        });

    };

    function checkTie() {

        if (gameBoard.markedSquares.length == 9 && !gameBoard.markedSquares.includes(undefined)) {
            return true;
        } else {
            return false;
        }

    };

    function swapPlayers() {

        playerA.toggleStatus();
        playerB.toggleStatus();
        gameBoard.board.classList.toggle(playerA.marker);
        gameBoard.board.classList.toggle(playerB.marker);

        this.activePlayer = playerA.getStatus() ? playerA : playerB;

    };

    function reset() {

        playerA.setActive(true); 
        playerB.setActive(false);
        this.activePlayer = playerA;

    };

    return { activePlayer, checkWinner, checkTie, swapPlayers, reset };


})();

// create display controller object using module pattern to store event listeners
const displayController = (() => {

    const message = document.querySelector('.message > p');
    const reset = document.querySelector('#reset');

    gameBoard.squares.forEach(square => {
        square.addEventListener('click', handleClick, { once: true });
    });

    // implement reset button
    reset.addEventListener('click', () => {

        // clear the board and reset eventlisteners
        gameBoard.squares.forEach(square => {
            square.classList.remove('x', 'o');
            square.addEventListener('click', handleClick, { once: true });
        });

        gameBoard.clear();

        game.reset();

        updateMessage('');

    });

    function handleClick(e) {

        // add mark to gameboard object and display
        gameBoard.add(Array.from(gameBoard.squares).indexOf(e.target));
        e.target.classList.add(game.activePlayer.marker);

        // call checkWinner function
        if (game.checkWinner()) {
            updateMessage(`Congratulations ${game.activePlayer.name}, you win!`);
            return;
        } else if (game.checkTie()) {
            updateMessage("It's a tie!");
            return;
        }

        // swap players
        game.swapPlayers();

        // update message
        updateMessage(`${game.activePlayer.name}, it's your turn!`);

    };

    function updateMessage(msg) {
        message.textContent = msg;
    };

})();

