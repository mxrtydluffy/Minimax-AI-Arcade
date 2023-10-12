// Initialize Board
// Coding the Algorithm 
const gameBoard = function (gameBoard) { // constructor
    this.board = board;
    this.player = 'O'; // AI
    this.opponent = 'X'; // User
}

// AI changing move on the board
gameBoard.prototype.makeMove = function(cellRow, cellColumn, player){
    if(this.board[cellRow][cellColumn] === '_'){
        this.board[cellRow][cellColumn] = player;
    }
}