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
var worker = new Worker('minmax.js');
worker.addEventListener('message', function(e) {
    console.log("worker said: ", e.data);
}, false);
window.onload = function() {
    updateDisplay(reversi_game.board);
    var buf = reversi_game.board.data();
    worker.postMessage(buf);
};

