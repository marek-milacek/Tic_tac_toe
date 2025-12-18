const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    
    const setMark = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true;
        }
        return false;
    };
    
    const getBoard = () => {
        return board;
    };
    
    const reset = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };
    
    return { setMark, getBoard, reset };
})();


const Player = (name, mark) => {
    return {name, mark};
};

const player1 = Player("Player1", "X");
const player2 = Player("Player2", "O");

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
            return "win";
        }

        if (checkDraw()) {
            gameOver = true;
            return "draw";
        }

        switchPlayer();
        return "continue";
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
    
    const reset = () => {
        currentPlayer = player1;
        gameOver = false;
        Gameboard.reset();
    };
    
    return { 
        playRound, 
        getCurrentPlayer: () => currentPlayer,
        reset
    };
})();


const DisplayController = (() => {
    const gameboardDiv = document.getElementById("gameboard");
    const resultDiv = document.getElementById("result");
    const currentPlayerSpan = document.getElementById("current-player");
    const restartBtn = document.getElementById("restart-btn");
    
    const render = () => {
        gameboardDiv.innerHTML = "";
        const board = Gameboard.getBoard();

        board.forEach((mark, index) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.dataset.index = index;
            cellDiv.textContent = mark;

            cellDiv.addEventListener("click", () => {
                const result = GameController.playRound(index);
                render();
                updateDisplay();
                
                if (result === "win") {
                    const winner = GameController.getCurrentPlayer();
                    displayResult(winner.name + " vyhrál!");
                } else if (result === "draw") {
                    displayResult("Remíza!");
                }
            });

            gameboardDiv.appendChild(cellDiv);
        });
    };
    
    const updateDisplay = () => {
        const currentPlayer = GameController.getCurrentPlayer();
        currentPlayerSpan.textContent = currentPlayer.name;
    };
    
    const displayResult = (message) => {
        resultDiv.textContent = message;
    };
    
    restartBtn.addEventListener("click", () => {
        GameController.reset();
        resultDiv.textContent = "";
        render();
        updateDisplay();
    });
    
    render();
    updateDisplay();
    
    return { render, updateDisplay, displayResult };
})();