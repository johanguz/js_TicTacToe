let players = [];

const beginningState = () => {
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

if (players.length === 2) {
    boardObject(players);
}
}

beginningState();

const boardObject = () => {
    if (players.length === 2) {
    const gridElement = document.querySelector('.container');
    let boardState = [null, null, null, null, null, null, null, null, null];
        (function newBoard () {
            boardState = [null, null, null, null, null, null, null, null, null];
        })();
    
        (function drawBoard() {
            for (let i = 0; i <= boardState.length; i++) {
                const grid = document.createElement('div');
                gridElement.appendChild(grid);
                grid.classList.add('box');
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

        }
}

const playGame = (params) => {
    let player1 = players[0];
    let player2 = players[1];   
    boardObject();
}

function playerFactory(name, piece) {
    const getName = () => name;
    const getPiece = () => piece;
    players.push({ name, piece });
    return { name, piece };
}
