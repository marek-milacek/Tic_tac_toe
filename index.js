const GameController = (() => {
    let currentPlayer = player1;
    let gameOver = false;

    const winningCombinations = [
        [0,1,2], [3,4,5], [6,7,8],  
        [0,3,6], [1,4,7], [2,5,8],  
        [0,4,8], [2,4,6] 
    ];

    const playRound = (index) => {
        if (gameOver) {
            return;
        }
        
        const success = Gameboard.setMark(index, currentPlayer.mark);
        
        if (!success) {
            return;
        }

        if (checkWinner()) {
            gameOver = true;
            console.log(currentPlayer.name + " won!");
            return;
        }

        if (checkDraw()) {
            gameOver = true;
            console.log("Draw!");
            return;
        }

        switchPlayer();
    };

    const checkWinner = () => {
        const board = Gameboard.getBoard();

        for (let combo of winningCombinations) {
            const pos1 = combo[0];
            const pos2 = combo[1];
            const pos3 = combo[2];

            const mark1 = board[pos1];
            const mark2 = board[pos2];
            const mark3 = board[pos3];

            if (mark1 !== "" && mark1 === mark2 && mark2 === mark3) {
                return true;
            }
        }

        return false;
    };

    const checkDraw = () => {
        const board = Gameboard.getBoard();
        return board.every(cell => cell !== "");
    };

    const switchPlayer = () => {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    };
    
    return { playRound, getCurrentPlayer: () => currentPlayer };
})();