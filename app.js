let players = [];
let turn = true;
let gameOver;

const beginningState = () => {
    //  Reset Button Logic
     const resetGame = document.querySelector('.newGame');
     const resetButton = document.createElement('div');
             resetGame.appendChild(resetButton);
             resetGame.classList.add('resetButton');
         resetButton.innerHTML = `
     <div class="container-fluid">
     <div class="d-grid gap-2">
     <button class="btn btn-danger" type="button">Reset Game</button>
     </div>
     </div>
     </div>
     `
     resetButton.addEventListener("click", () => {
        boardObject(players);
       })
     
    const gridHeader = document.querySelector('.header');
    const playerInput = document.createElement('div');
                gridHeader.appendChild(playerInput);
                gridHeader.classList.add('header');  
            playerInput.innerHTML = `
            <div class="container-fluid">
    <div class="row border">
        <div class="col-6">
            <input class="form-control form-control-lg player1" type="text" placeholder="Player 1 Name" aria-label="Enter Player 1 Name">

        </div>
        <div class="col-6">
            <input class="form-control form-control-lg player2" type="text" placeholder="Player 2 Name" aria-label="Enter Player 2 Name">

        </div>
    </div>
</div>

            `
    const player1Input = document.querySelector('.player1');
         player1Input.addEventListener("keypress", (e) => {
             if (e.key === "Enter" && player1Input.value !== "" && players.length <= 2 ){
                playerFactory(`${player1Input.value}`, "X")}
            if (player2Input.value !== "" && players.length === 0) {
                    playerFactory(`${player2Input.value}`, "O")}

            boardObject(players);
          } )

    const player2Input = document.querySelector('.player2');
          player2Input.addEventListener("keypress", (e) => {
             if (e.key === "Enter" && player2Input.value !== "" && players.length <= 2 ) {
                playerFactory(`${player2Input.value}`, "O")}
             if (player1Input.value !== "" && players.length === 0) {
                playerFactory(`${player1Input.value}`, "X")}
            
            boardObject(players);
})
}

const boardObject = () => {
    let player1;
    let player2;
    let boardState = ["", "", "", "", "", "", "", "", ""];

 if (players.length === 2) {

    //  // Reset Button Logic
    //  const resetGame = document.querySelector('.newGame');
    //  const resetButton = document.createElement('div');
    //          resetGame.appendChild(resetButton);
    //          resetGame.classList.add('resetButton');
    //      resetButton.innerHTML = `
    //  <div class="container-fluid">
    //  <div class="d-grid gap-2">
    //  <button class="btn btn-danger" type="button">Reset Game</button>
    //  </div>
    //  </div>
    //  </div>
    //  `
    //  resetButton.addEventListener("click", () => {
    //     boardObject(players);
    //    })
     

        (() => {
            if (players[0].piece === "X") {
            player1 = players[0].name;
            player2 = players[1].name;
        }
        else {
            player2 = players[0].name;
            player1 = players[1].name;
        }})();

    function turnDisplay (turn) {
            if (turn) {
                const turnElement = document.querySelector('.turn');
                    turnElement.innerHTML = `
                        <div class="container-fluid">
                        <div class="row">
                        <div class="col-12 player1">
                            <h1>It's ${player1}'s turn</h1>
                        </div>
                        </div>
                        </div>`
                }
            else {
                const turnElement = document.querySelector('.turn');
                    turnElement.innerHTML = `
                        <div class="container-fluid">
                        <div class="row">
                        <div class="col-12 player2">
                            <h1>It's ${player2}'s turn</h1>
                        </div>
                        </div>
                        </div>`
            }

            
        }
        
        (function newBoard () {
            boardState = ["", "", "", "", "", "", "", "", ""];
            turn = true;
            turnDisplay(turn);
        })();
        
        (function drawBoard() {
        const gridElement = document.querySelector('.board');
            gridElement.innerHTML = "";
            for (let i = 0; i <= boardState.length-1; i++) {
                const grid = document.createElement('div');
                gridElement.appendChild(grid);
                grid.classList.add('box');
                grid.addEventListener("click", () => {
                    if (turn && boardState[i] === "") {
                        boardState[i] = "X";
                        turn = false;
                        drawBoard();
                        if (isGameOver() === true) {
                            boardState = ["", "", "", "", "", "", "", "", ""];
                            turn = true;
                            drawBoard();
                            const turnElement = document.querySelector('.turn');
                            turnElement.innerHTML = `
                            <div class="container-fluid">
                        <div class="row">
                        <div class="col-12 player1">
                            <h1>${player1} WINS!!!!</h1>
                        </div>
                        </div>
                        </div>`
                        }
                        else if(isGameOver() === "tie") {
                            boardState = ["", "", "", "", "", "", "", "", ""];
                            turn = true;
                            drawBoard();
                            const turnElement = document.querySelector('.turn');
                            turnElement.innerHTML = `
                            <div class="container-fluid">
                            <div class="row">
                            <div class="col-12 player1">
                                <h1>It's a Tie</h1>
                            </div>
                            </div>
                            </div>`
                        
                        }
                        else {
                        turnDisplay(turn);}
                    }
                    else if(!turn && boardState[i] === "") {
                        boardState[i] = "O";
                        turn = true;
                        drawBoard();
                        if (isGameOver() === true) {
                            boardState = ["", "", "", "", "", "", "", "", ""];
                            turn = true;
                            drawBoard();
                            const turnElement = document.querySelector('.turn');
                            turnElement.innerHTML = `
                            <div class="container-fluid">
                            <div class="row">
                            <div class="col-12 player1">
                                <h1>${player2} WINS!!!!</h1>
                            </div>
                            </div>
                            </div>`
                        }
                        else if(isGameOver() === "tie") {
                            boardState = ["", "", "", "", "", "", "", "", ""];
                            turn = true;
                            drawBoard();
                            const turnElement = document.querySelector('.turn');
                            turnElement.innerHTML = `
                            <div class="container-fluid">
                            <div class="row">
                            <div class="col-12 player1">
                                <h1>It's a Tie</h1>
                            </div>
                            </div>
                            </div>`
                        
                        }
                        else {
                            turnDisplay(turn);}
                    }
                })
                if (boardState[i] === null) {
                    grid.innerHTML = "";
                }
                else if (boardState[i] === "X") {
                    grid.innerHTML = "X";
                }
                else if (boardState[i] === "O") {
                    grid.innerHTML = "O";
                }
            }
         })();

        function isGameOver () {
            if ((boardState[0] + boardState[1] + boardState[2]) === ("XXX" || "OOO") ||
                (boardState[3] + boardState[4] + boardState[5]) === ("XXX" || "OOO") ||
                (boardState[6] + boardState[7] + boardState[8]) === ("XXX" || "OOO") ||
                (boardState[1] + boardState[4] + boardState[7]) === ("XXX" || "OOO") ||
                (boardState[0] + boardState[3] + boardState[6]) === ("XXX" || "OOO") ||
                (boardState[2] + boardState[5] + boardState[8]) === ("XXX" || "OOO") ||
                (boardState[2] + boardState[4] + boardState[6]) === ("XXX" || "OOO") ||
                (boardState[0] + boardState[4] + boardState[8]) === ("XXX" || "OOO"))
            
            {
                   return true;
                }
            else if 
                (boardState.indexOf("") === -1) {
                   return "tie"
            }
            else {
                    return false;
            }
        }

    }
}

// const playGame = (params) => {
//     let player1 = players[0];
//     let player2 = players[1];   
//     boardObject();
//     }

function playerFactory(name, piece) {
    const getName = () => name;
    const getPiece = () => piece;
    players.push({ name, piece });
    return { name, piece };
}


beginningState();
