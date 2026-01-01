const GameBoard = (function() {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        gameboard.forEach((square, index) => {
            const cell = document.querySelector(`.cell[data-index="${index}"]`)
            cell.textContent = square
        });
    };

    const update = (index, value) => {
        if (gameboard[index] === "") {
            gameboard[index] = value;
            render();
            return true;
        }
        return false
    };

    const checkWin = () => {
        const winningAxes = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8], 
            [0,4,8], [2,4,6]           
        ];
    
        for (let i = 0; i < winningAxes.length; i++) {
            const [a, b, c] = winningAxes[i];

            if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
                return gameboard[a];
            }
        }
        return null
    };

    return { update, checkWin };
})();  

let currentPlayer = 'X'

const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');

        const tahSePovedl = GameBoard.update(index, currentPlayer);

        if (tahSePovedl) {

            // winner control
            const winner = GameBoard.checkWin();

            if (winner) {
                setTimeout(() => {
                    alert(`Vítěz je ${winner}!`);
                }, 10);
                return;
            }

            if (currentPlayer === 'X') {
                currentPlayer = 'O';
            } else {
                currentPlayer = 'X';
            }            
        }
    });
});

const restartButton = document.getElementById('restart');

restartButton.addEventListener('click', () => {location.reload()});