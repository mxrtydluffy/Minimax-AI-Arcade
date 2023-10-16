import gameBoard from './minimax.js'
const board = [['_','_','_'], ['_','_','_'], ['_','_','_']]
let newBoard = new gameBoard(board)
console.log(newBoard)

// Winner can either be user or AI 
let $winner = $('#winner');

// Declare slots by id
let $one = $('#one');
let $two = $('#two');
let $three = $('#three');
let $four = $('#four');
let $five = $('#five');
let $six = $('#six');
let $seven = $('#seven');
let $eight = $('#eight');
let $nine = $('#nine');

let $box = $('.box');
let $reset = $('#reset');

// Look for object
const search = {
    one: {i: 0, j: 0},
    two: {i: 0, j: 1},
    three: {i: 0, j: 2},
    four: {i: 1, j: 0},
    five: {i: 1, j: 1},
    six: {i: 1, j: 2},
    seven: {i: 2, j: 0},
    eight: {i: 2, j: 1},
    nine: {i: 2, j: 2}
}

const lookUp = {
    1: $one,
    2: $two,
    3: $three,
    4: $four,
    5: $five,
    6: $six,
    7: $seven,
    8: $eight,
    9: $nine
}

// Available moves
// let moves = [$one, $two, $three, $four, $five, $six, $seven, $eight, $nine]

// Player move when clicks mouse. | Displays color
$box.on('mouseenter', function(event){
    if($(event.currentTarget).hasClass('available') == true){
        $(event.currentTarget).addClass('player1');
    } else {
        $(event.currentTarget).addClass('unavailable');
    }
})

// After a click | Displays another color
$box.on('mouseleave', function(event){
    $(event.currentTarget).removeClass('player1 unavailable');
})

// Will put X on available spots.
$box.on('click', function(event){
    if($(event.currentTarget).hasClass('available') == true){
    $(event.currentTarget).html('X');
    $(event.currentTarget).addClass('player1clicked');
    $(event.currentTarget).removeClass('available');
        if(Won('player1clicked') == true){
            $winner.css('visibility', 'visible')
            $winner.html('You win');
            $box.removeClass('available');
            console.log('You Win!')
            return;
        }
        // Push response to board
        let currentId = event.currentTarget.id
        let idLocation = search[currentId];

        newBoard.makeMove(idLocation.i, idLocation.j, 'X')

        // After response check if won
        if(!newBoard.isAvailable()){
            $winner.css('visibility', 'visible')
            $winner.html('Draw');
            console.log('It\'s a Draw!')
        }

        // AI CODE

        const AIMOVE = newBoard.nextMove();
        newBoard.makeMove(AIMOVE.row, AIMOVE.column, 'O')
        const linearVal = 3 * AIMOVE.row + AIMOVE.column + 1;
        let $nextClick = lookUp[linearVal]

        setTimeout(() =>{
            $nextClick.html('O')
        }, 500);
        // Checking if other player went
        $nextClick.addClass('player2clicked');
        $nextClick.removeClass('available');
    }

    // Add effect when won

    if(Won('player2clicked') === true){
        $winner.css('visibility', 'visible')
        $winner.html('AI wins');
        $box.removeClass('available');
    }
})

const optionsRemaining = (array) => {
    // .filter will filter unavailable options.
    let availableArr = array.filter(square => square.hasClass('available'));
    return availableArr;
}

// Determine randomized choice for computer to play
const nextPlay = (arr) => {
    // Make move
    let availableMoves = optionsRemaining(arr);
    let x = availableMoves.length;
    // Choose index for next move.
    let random = Math.floor(Math.random() * x);
    let move = availableMoves[random];
    console.log(move);
    return move;
}

// Determining who won
const Won = (clicked) => {
    if($one.hasClass(clicked) === true && $two.hasClass(clicked) === true && $three.hasClass(clicked) === true) {
        return true;
    }
    else if( $one.hasClass(clicked) === true && $four.hasClass(clicked) === true && $seven.hasClass(clicked) === true) {
        return true;
    }
     else if( $one.hasClass(clicked) === true && $five.hasClass(clicked) === true && $nine.hasClass(clicked) === true) {
        return true;
    }
    else if( $four.hasClass(clicked) === true && $five.hasClass(clicked) === true && $six.hasClass(clicked) === true) {
        return true;
    }
    else if( $two.hasClass(clicked) === true && $five.hasClass(clicked) === true && $eight.hasClass(clicked) === true) {
        return true;
    }
    else if( $seven.hasClass(clicked) === true && $eight.hasClass(clicked) === true && $nine.hasClass(clicked) === true) {
        return true;
    }
    else if( $three.hasClass(clicked) === true && $six.hasClass(clicked) === true && $nine.hasClass(clicked) === true) {
        return true;
    }
    else if( $three.hasClass(clicked) === true && $five.hasClass(clicked) === true && $seven.hasClass(clicked) === true) {
        return true;
    } else {
        return false; 
    }
}

// Reset button
const resetButton = () => {
    // Removing ID
    $('.box').removeClass('player1clicked player2clicked unavailable');
    $('.box').addClass('available');
    $('.box').html('');
    $winner.html('');
    $winner.css('visibility', 'hidden');
    console.log(newBoard)
    newBoard.board = [['_','_','_'], ['_','_','_'], ['_','_','_']];
    console.log(newBoard)
}

$reset.on('click', function(){
    resetButton();
})