var ReversiGame = function() {
    this.board = new Board(8);
    this.board.set(3,3,this.board.P1);
    this.board.set(3,4,this.board.P2);
    this.board.set(4,3,this.board.P2);
    this.board.set(4,4,this.board.P1);

    this.getBoard = function() {
	return this.board;
    }
};

var reversi_game = new ReversiGame();
var worker;

window.onload = function() {
    updateDisplay(reversi_game.board);
};

var started = false;
var waiting = false;
var gameOver = false;
var moveStartTime;

function nextMove() {
    if (gameOver)
	return;
    if (waiting)
	return;
    waiting = true;
    if (!started)
	startGame();
    document.title = "Player " + reversi_game.board.currentPlayer() +
	" thinking...";
    moveStartTime = performance.now();
    worker.postMessage(reversi_game.board.state);
}

function startGame() {
    if (!started) {
	started = true;
	worker = new Worker('minmax.js');
	worker.addEventListener('message', function(e) {
	    if (typeof e.data == "string") {
		console.log("worker said: ", e.data);
	    } else {
		var moveTime = performance.now() - moveStartTime;
		console.log("did move", e.data, moveTime);
		reversi_game.board.state = e.data;
		updateDisplay(reversi_game.board);
		waiting = false;
		var counts = reversi_game.board.counts();
		if (counts[0] == 0) {
		    console.log("GAME OVER " + counts);
		    document.title =
			"GAME OVER: " + counts[1] + " to " + counts[2];
		    gameOver = true;
		} else {
		    nextMove();
		}
	    }
	}, false);
    }
}
