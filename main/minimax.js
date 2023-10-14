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

// Checks if there's open spaces
Board.prototype.isAvailable = function(){
    if(this.board.flat().includes('_')){
        return true;
    } else {
        return false;
    }
}

// Checks win in 3x3 plane
Board.prototype.checkWin = function(p){
    // ROWS
    if(this.board[0][0] === p && this.board[0][1] === p && this.board[0][2] === p){ // 0
        return true;
    }else if(this.board[1][0] === p && this.board[1][1] === p && this.board[1][2] === p){ // 1
        return true;
    }else if (this.board[2][0] === p && this.board[2][1] === p && this.board[2][2] === p){ // 2
        return true;
    // COLUMN
    }else if(this.board[0][0] === p && this.board[1][0] === p && this.board[2][0] === p){ // 0
        return true;
    }else if(this.board[0][1] === p && this.board[1][1] === p && this.board[2][1] === p){ // 1
        return true;
    }else if(this.board[0][2] === p && this.board[1][2] === p && this.board[2][2] === p){ // 2
        return true;
    // Diagonal Win | Backslash
    }else if(this.board[0][0] === p && this.board[1][1] === p && this.board[2][2] === p){
        return true;
    // Diagonal Win | Foward slash
    }else if(this.board[0][2] === p && this.board[1][1] === p && this.board[2][0] === p){
        return true;
    }else{
        return false;
    }
}

// Looks for open square
Board.prototype.openSquare = function(square){
    return square === ')';
}

// Checks if Game Over
Board.prototype.score = function(depth=0){
    if(this.checkWin(this.player)){
        return 100 - depth;
    } else if(this.checkWin(this.opponent)){
        return -(100-depth);
    } else if(!this.isAvailable()){
        return 0;
    } else {
        return null;
    }
}