// Initialize Board
// Coding the Algorithm 
const gameBoard = function (board){ // constructor
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
gameBoard.prototype.isAvailable = function(){
    if(this.board.flat().includes('_')){
        return true;
    } else {
        return false;
    }
}

// Checks win in 3x3 plane
gameBoard.prototype.checkWin = function(p){
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
gameBoard.prototype.openSquare = function(square){
    return square === '_';
}

// Checks if Game Over
gameBoard.prototype.score = function(depth=0){
    if(this.checkWin(this.player)){
        return 100 - depth;
    } else if(this.checkWin(this.opponent)){
        return -100 + depth;
    } else if(!this.isAvailable()){
        return 0;
    } else {
        return null;
    }
}

// AI next move
gameBoard.prototype.nextMove = function(){
    // Low score to minimize
    let highScore = -Infinity;
    // Row and column to select the best square
    let address;
    // Loop through all empty squares on board
    for(let i = 0; i < this.board.length; i++){
        for(let j = 0; j< this.board.length; j++){
            if(this.openSquare(this.board[i][j])){
                this.board[i][j] = this.player;
                // Get minimax on empty square
                let score = this.minimax(false, 0)
                // Reset
                this.board[i][j] = '_'
                if(score > highScore){
                    highScore = score;
                    address = {row: i, column: j, score: score}
                }
            }
        }
    }
    // Call mimimax and return open score.
    // Max score -> Maximizer
    // Min score -> Minimizer
    // No terminal case -> recursive call
    return address;
}

gameBoard.prototype.minimax = function(isMaximizing, depth=0){
    // terminal case: If score is returned, game is finish
    let score = this.score(depth)
    // null not at terminal state.
    if(score !== null){
        return score;
    }

    let highScore = isMaximizing ? - Infinity : Infinity;
    let currentPlayer = isMaximizing ? this.player : this.opponent;

    for(let i = 0; i < this.board.length; i++){
        for(let j = 0; j < this.board.length; j++){
            if(this.openSquare(this.board[i][j])){
                this.board[i][j] = currentPlayer
                // Opposite of maximizing
                let score = this. minimax(!isMaximizing, depth + 1)
                // Reset
                this.board[i][j] = '_'
                // Maximum score if maximizing
                if(isMaximizing){
                    highScore = Math.max(score, highScore)
                } else {
                    // Minimum score if minimizing
                    highScore = Math.min(score, highScore)
                }
            }
        }
    }
    return highScore;
}

export default gameBoard;