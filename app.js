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

  startGame() {
    this.currPlayer = 1;
    this.player1NameInput = document.getElementById('player1name');
    this.player1ColorInput = document.getElementById('player1input');
    this.player2NameInput = document.getElementById('player2name');
    this.player2ColorInput = document.getElementById('player2input');

    const formContainer = document.getElementById('form-container');
    formContainer.style.display = 'none';

    const player1Name = this.player1NameInput.value || "Player 1";
    const player1Color = this.player1ColorInput.value;
    const player2Name = this.player2NameInput.value || "Player 2";
    const player2Color = this.player2ColorInput.value;

    if (!player1Color || !player2Color) {
        alert("Please select your colors!");
        return;
    }

    if (player1Color === player2Color) { // So players cannot be the same color
        alert("Please choose different colors!");
        return;
    }

    this.boardElement = document.getElementById('board');
    if (!this.boardElement) {
        console.error("Board element not found");
        return;
    }

    this.players = [
        new Player(player1Name, player1Color, 1),
        new Player(player2Name, player2Color, 2)
    ];

    this.resetGame();
    this.makeBoard();
    this.makeHtmlBoard();
    this.gameStarted = true;
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

  handleCellClick(evt){
    const x = +evt.target.id;
    const y = this.findSpotForCol(x);
    if(y === null){
      return;
    }
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y,x);

    if(this.checkForWin()){
      return this.endGame(`Player ${this.currPlayer} won!`);
    }
    if(this.board.every(row => row.every(cell => cell))){
      return this.endGame('TIE!');
    }
    this.currPlayer === 1 ? 2 : 1 ;
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

  const existingPlayAgainBtn = document.getElementById('play-again-btn');   //  so buttons dont stack
  if(existingPlayAgainBtn){
    existingPlayAgainBtn.remove();
  }

  const existingExitBtn = document.getElementById('exit-btn');
  if(existingExitBtn){
    existingExitBtn.remove();
  }
  
  const playAgainBtn = document.createElement('button');
  playAgainBtn.setAttribute('id' , 'play-again-btn');
  playAgainBtn.textContent = 'Play Again!';
  playAgainBtn.addEventListener('click' , ()=>{
    this.resetGame();
    this.startGame();
  });

  const exitBtn = document.createElement('button');
  exitBtn.setAttribute('id', 'exit-btn');
  exitBtn.textContent = 'Exit';
  exitBtn.addEventListener('click' , ()=>{
    const formContainer= document.getElementById('form-container');
    formContainer.style.display = 'block';

    const gameContainer=  document.getElementById('game-container');
  if(gameContainer){
    gameContainer.remove();
  }
  })

  const gameContainer = document.createElement('div');
  gameContainer.setAttribute('id' , 'game-container');
  gameContainer.style.position = 'relative';

  gameContainer.appendChild(this.boardElement);
  gameContainer.appendChild(playAgainBtn);
  gameContainer.appendChild(exitBtn);

  document.body.appendChild(gameContainer);
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
