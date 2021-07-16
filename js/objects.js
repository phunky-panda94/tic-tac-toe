export const gameBoard = {
    squares: []
};

export const PlayerFactory = (name, marker) => {
    return { 
        name, 
        marker,
        addMark(marker) {
            gameBoard.squares.push(marker);
        } 
    };
}