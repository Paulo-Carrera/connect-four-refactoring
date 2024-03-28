

// /** Connect Four
//  *
//  * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
//  * column until a player gets four-in-a-row (horiz, vert, or diag) or until
//  * board fills (tie)
//  */

// const WIDTH = 7;
// const HEIGHT = 6;

// let currPlayer = 1; // active player: 1 or 2
// let board = []; // array of rows, each row is array of cells  (board[y][x])

// /** makeBoard: create in-JS board structure:
//  *   board = array of rows, each row is array of cells  (board[y][x])
//  */

// function makeBoard() {
//   for (let y = 0; y < HEIGHT; y++) {
//     board.push(Array.from({ length: WIDTH }));
//   }
// }

// /** makeHtmlBoard: make HTML table and row of column tops. */

// function makeHtmlBoard() {
//   const board = document.getElementById('board');

//   // make column tops (clickable area for adding a piece to that column)
//   const top = document.createElement('tr');
//   top.setAttribute('id', 'column-top');
//   top.addEventListener('click', handleClick);

//   for (let x = 0; x < WIDTH; x++) {
//     const headCell = document.createElement('td');
//     headCell.setAttribute('id', x);
//     top.append(headCell);
//   }

//   board.append(top);

//   // make main part of board
//   for (let y = 0; y < HEIGHT; y++) {
//     const row = document.createElement('tr');

//     for (let x = 0; x < WIDTH; x++) {
//       const cell = document.createElement('td');
//       cell.setAttribute('id', `${y}-${x}`);
//       row.append(cell);
//     }

//     board.append(row);
//   }
// }

// /** findSpotForCol: given column x, return top empty y (null if filled) */

// function findSpotForCol(x) {
//   for (let y = HEIGHT - 1; y >= 0; y--) {
//     if (!board[y][x]) {
//       return y;
//     }
//   }
//   return null;
// }

// /** placeInTable: update DOM to place piece into HTML table of board */

// function placeInTable(y, x) {
//   const piece = document.createElement('div');
//   piece.classList.add('piece');
//   piece.classList.add(`p${currPlayer}`);
//   piece.style.top = -50 * (y + 2);

//   const spot = document.getElementById(`${y}-${x}`);
//   spot.append(piece);
// }

// /** endGame: announce game end */

// function endGame(msg) {
//   alert(msg);
// }

// /** handleClick: handle click of column top to play piece */

// function handleClick(evt) {
//   // get x from ID of clicked cell
//   const x = +evt.target.id;

//   // get next spot in column (if none, ignore click)
//   const y = findSpotForCol(x);
//   if (y === null) {
//     return;
//   }

//   // place piece in board and add to HTML table
//   board[y][x] = currPlayer;
//   placeInTable(y, x);
  
//   // check for win
//   if (checkForWin()) {
//     return endGame(`Player ${currPlayer} won!`);
//   }
  
//   // check for tie
//   if (board.every(row => row.every(cell => cell))) {
//     return endGame('Tie!');
//   }
    
//   // switch players
//   currPlayer = currPlayer === 1 ? 2 : 1;
// }

// /** checkForWin: check board cell-by-cell for "does a win start here?" */

// function checkForWin() {
//   function _win(cells) {
//     // Check four cells to see if they're all color of current player
//     //  - cells: list of four (y, x) cells
//     //  - returns true if all are legal coordinates & all match currPlayer

//     return cells.every(
//       ([y, x]) =>
//         y >= 0 &&
//         y < HEIGHT &&
//         x >= 0 &&
//         x < WIDTH &&
//         board[y][x] === currPlayer
//     );
//   }

//   for (let y = 0; y < HEIGHT; y++) {
//     for (let x = 0; x < WIDTH; x++) {
//       // get "check list" of 4 cells (starting here) for each of the different
//       // ways to win
//       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
//       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
//       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
//       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

//       // find winner (only checking each win-possibility as needed)
//       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
//         return true;
//       }
//     }
//   }
// }



//  my code

// class Player{
//   constructor(name, color){
//     this.name = name ;
//     this.color = color ;
//   }
// }

// class Game{
//     constructor(HEIGHT , WIDTH){
//         this.WIDTH = WIDTH ;
//         this.HEIGHT = HEIGHT ;

//         this.currPlayer = 1;
//         this.board = [];
//         this.gameStarted = false ;  //  Track if the game is started
//         this.player1Color = null ;
//         this.player2Color = null ;
//         // this.boardElement = document.getElementById('board');
//         // this.startButton = document.getElementById('start-btn');
//         // this.startButton.addEventListener('click' , () => this.startGame());
//         // this.player1ColorInput = document.getElementById('player1input');
//         // this.player2ColorInput = document.getElementById('player2input');
//     }

//     startGame(){
//     this.currPlayer = 1 ;
//     this.boardElement = document.getElementById('board');
//     // this.startButton = document.getElementById('start-btn');
//     this.player1NameInput = document.getElementById('player1name');
//     this.player1ColorInput = document.getElementById('player1input');

//     this.player2NameInput = document.getElementById('player2name');
//     this.player2ColorInput = document.getElementById('player2input');
//     // this.startButton.addEventListener('click' , () => this.startGame());



//     if(!this.gameStarted) {
//       const player1Name = this.player1NameInput.value || "Player 1";
//       const player1Color = this.player1ColorInput.value || "red" ;
//       const player2Name = this.player2NameInput.value || "Player 2";
//       const player2Color = this.player2ColorInput.value || "blue" ;

    
//       if(!player1Color || !player2Color ){
//         alert("Please select your colors!");
//         return ;
//       }

//       this.players = [
//         new Player(player1Name , player1Color),
//         new Player(player2Name , player2Color),
//       ]

//       this.currPlayer = 1 ;
//       this.gameStarted = true ;
//       this.makeBoard();
//       this.makeHtmlBoard();
//   } else {
//     //  if the game is already started , reset the board and HTML elements
//     this.resetGame();
//     this.makeBoard();
//     this.makeHtmlBoard();
//   }        
//   }

//   //  RESET GAME:
//     resetGame(){
//       //reset all variables and elements necessary
//       this.currPlayer = 1 ;
//       this.board = [];
//       this.boardElement.innerHTML = '';
//       }

//     makeBoard(){
        
//         for (let y = 0; y < this.HEIGHT; y++) {
//             this.board.push(Array.from({ length: this.WIDTH }));
//           }        
//     }

//     makeHtmlBoard(){
// // console.log("make html board called");
//         const handleClick = (evt) => this.handleClick(evt);

//         // make column tops (clickable area for adding a piece to that column)
//         const top = document.createElement('tr');
//         top.setAttribute('id', 'column-top');
//         top.addEventListener('click', handleClick.bind(this));
      
//         for (let x = 0; x < this.WIDTH; x++) {
//           const headCell = document.createElement('td');
//           headCell.setAttribute('id', x);
//           top.append(headCell);
//         }
      
//         this.boardElement.innerHTML = '';
//         this.boardElement.append(top);
      
//         // make main part of board
//         for (let y = 0; y < this.HEIGHT; y++) {
//           const row = document.createElement('tr');
      
//           for (let x = 0; x < this.WIDTH; x++) {
//             const cell = document.createElement('td');
//             cell.setAttribute('id', `${y}-${x}`);
//             row.append(cell);
//           }
      
//           this.boardElement.append(row);
//         }
//     }    


//     findSpotForCol(x) {
//         for (let y = this.HEIGHT - 1; y >= 0; y--) {
//           if (!this.board[y][x]) {
//             return y;
//           }
//         }
//         return null;
//       }


//       placeInTable(y, x) {
//         const currentPlayer = this.players.find(player => player.name === `Player ${this.currPlayer}` );

//         if(!currentPlayer){
//           console.error("Current player not found");
//           return;
//         }

//         const piece = document.createElement('div');
//         piece.classList.add('piece');
//         piece.classList.add(`p${this.currPlayer}`);
//         piece.style.backgroundColor = currentPlayer.color;
//         piece.style.top = -50 * ( y + 2 );

//         const spot = document.getElementById(`${y}-${x}`);
        
//         if(spot){
//           spot.appendChild(piece);
//         }else{
//           console.error("Element with ID not found");
//         }
//       }


//       endGame() {
//         const winnerName = this.players.find(player=> player.name === `Player ${this.currPlayer}`).name ;

//         alert(`${winnerName} Won!`);
//         const startBtn = document.getElementById('start-btn');
//         startBtn.textContent = 'Play Again';
//       }

      


//       handleClick(evt) {


//         if(this.checkForWin()){
//             return ;              //  if the game is already won , return without processing further moves .
//         }

//         // get x from ID of clicked cell
//         const x = +evt.target.id;
      
//         // get next spot in column (if none, ignore click)
//         const y = this.findSpotForCol(x);
//         if (y === null) {
//           return;
//         }
      
//         // place piece in board and add to HTML table
//         this.board[y][x] = this.currPlayer;
//         this.placeInTable(y, x);
        
//         // check for win
//         if (this.checkForWin()) {
//           return this.endGame(`Player ${this.players[this.currPlayer - 1].name} won!`);
//         }
        
//         // check for tie
//         if (this.board.every(row => row.every(cell => cell))) {
//           return this.endGame('Tie!');
//         }
          
//         // switch players
//         this.currPlayer = this.currPlayer === 1 ? 2 : 1;

//         //update current player name 
//         const currentPlayerNameDisplay = document.getElementById('current-player-name');
//         currentPlayerNameDisplay.textContent = `Current Player : ${this.players[this.currPlayer - 1].name}`;
//       }      


      

//       checkForWin(){
//         const _checkForWin = (cells) => {
//         return cells.every(
//             ([y , x]) =>
//             y >= 0 &&
//             y < this.HEIGHT &&
//             x >= 0 &&
//             x < this.WIDTH &&
//             this.board[y][x] === this.currPlayer
//             );
//         }
      
//         for (let y = 0; y < this.HEIGHT; y++) {
//           for (let x = 0; x < this.WIDTH; x++) {
//             // get "check list" of 4 cells (starting here) for each of the different
//             // ways to win
//             const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
//             const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
//             const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
//             const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      
//             // find winner (only checking each win-possibility as needed)
//             if (_checkForWin(horiz) || _checkForWin(vert) || _checkForWin(diagDR) || _checkForWin(diagDL)) {
//               return true;
//                 }
//             }
//         }
//         return false ;
//     }
// }


// const game = new Game(6,7);

// const startBtn = document.querySelector('#start-btn');
// startBtn.addEventListener('click' , (event)=> {
//         event.preventDefault();
//         game.startGame();
// })


class Player {
  constructor(name, color , number) {
    this.name = name;
    this.color = color;
    this.number = number;
  }
}

class Game {
  constructor(HEIGHT, WIDTH) {
    this.WIDTH = WIDTH;
    this.HEIGHT = HEIGHT;

    this.currPlayer = 1;
    this.board = [];
    this.gameStarted = false;
    this.player1Color = null;
    this.player2Color = null;
  }

  startGame(){
    this.currPlayer = 1 ;
    this.boardElement = document.getElementById('board');
    this.player1NameInput = document.getElementById('player1name');
    this.player1ColorInput = document.getElementById('player1input');
    this.player2NameInput = document.getElementById('player2name');
    this.player2ColorInput = document.getElementById('player2input');

    if (!this.players || !Array.isArray(this.players) || this.players.length !== 2) {
        const player1Name = this.player1NameInput.value || "Player 1";
        const player1Color = this.player1ColorInput.value;
        const player2Name = this.player2NameInput.value || "Player 2";
        const player2Color = this.player2ColorInput.value;

        if(!player1Color || !player2Color ){
            alert("Please select your colors!");
            return ;
        }

        if (this.players && this.players.length === 2) {
            this.players[0].name = player1Name;
            this.players[0].color = player1Color;
            this.players[1].name = player2Name;
            this.players[1].color = player2Color;
        } else {
            this.players = [
                new Player(player1Name , player1Color , 1),
                new Player(player2Name , player2Color , 2)
            ];
        }

        this.makeBoard();
        this.makeHtmlBoard();
        this.gameStarted = true;
    } else {
        // Reset game if already started
        this.resetGame();
        this.makeBoard();
        this.makeHtmlBoard();
    }
}


  resetGame() {
    this.currPlayer = 1;
    this.board = [];
    this.boardElement.innerHTML = '';
  }

  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }

  makeHtmlBoard() {
    const handleClick = (evt) => this.handleClick(evt);

    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', handleClick.bind(this));

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    this.boardElement.innerHTML = '';
    this.boardElement.append(top);

    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      this.boardElement.append(row);
    }
  }

  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    const currentPlayer = this.players[this.currPlayer - 1]; // Adjust index since currPlayer starts from 1

    if (!currentPlayer) {
        console.error("Current player not found");
        return;
    }

    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${this.currPlayer}`);
    piece.style.backgroundColor = currentPlayer.color;
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);

    if (spot) {
        spot.appendChild(piece);
    } else {
        console.error("Element with ID not found");
    }
}

endGame() {
  const winner = this.players.find(player => player.number === this.currPlayer);
  if (!winner) {
      console.error("Winner not found");
      return;
  }
  const winnerName = winner.name;

  alert(`${winnerName} Won!`);
  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
      startBtn.textContent = 'Play Again';
  }
}

  handleClick(evt) {
    if (this.checkForWin()) {
      return;
    }

    const x = +evt.target.id;
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer} won!`);
    }

    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }

    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  }

  checkForWin() {
    const _checkForWin = (cells) => {
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    }

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        if (_checkForWin(horiz) || _checkForWin(vert) || _checkForWin(diagDR) || _checkForWin(diagDL)) {
          return true;
        }
      }
    }
    return false;
  }
}

const game = new Game(6, 7);

const startBtn = document.querySelector('#start-btn');
startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  game.startGame();
});
