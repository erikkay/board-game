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

function nextMove() {
    if (!started)
	startGame();
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
		console.log("did move");
		reversi_game.board.state = e.data;
		updateDisplay(reversi_game.board);
	    }
	}, false);
    }
}
