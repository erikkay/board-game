var ReversiGame = function() {
    this.board = new Board(8);
    this.board.set(3,3,this.board.P1);
    this.board.set(3,4,this.board.P2);
    this.board.set(4,3,this.board.P2);
    this.board.set(4,4,this.board.P1);

    this.getBoard = function() {
	return this.board;
    }

    this.updateDisplay = function() {
	var canvas = document.getElementById("board");
	var ctx = canvas.getContext("2d");
	var size = canvas.width / this.board.size;
	ctx.fillStyle = "rgb(0,155,0)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	for (var col = 1; col < 8; col++) {
	    var x = col * size;
	    ctx.moveTo(x, 0);
	    ctx.lineTo(x, canvas.height);
	}
	for (var row = 1; row < 8; row++) {
	    var y = row * size;
	    ctx.moveTo(0, y);
	    ctx.lineTo(canvas.width, y);
	}
	ctx.stroke();
	var x = size / 2;
	for (var col = 0; col < this.board.size; col++, x += size) {
	    var y = size / 2;
	    for (var row = 0; row < this.board.size; row++, y += size) {
		var p = this.board.get(col, row);
		if (p == this.board.EMPTY) {
		    continue;
		} else if (p == this.board.P1) {
		    ctx.fillStyle = "white";
		} else if (p == this.board.P2) {
		    ctx.fillStyle = "black";
		} else {
		    console.log("I hate JS");
		    continue;
		}
		ctx.beginPath();
		ctx.arc(x, y, (size/2)*.8, 0, Math.PI*2, true);
		ctx.fill();
	    }
	}
    }

};

var reversi_game = new ReversiGame();
var worker = new Worker('minmax.js');
worker.addEventListener('message', function(e) {
    console.log("worker said: ", e.data);
}, false);
window.onload = function() {
    reversi_game.updateDisplay();
    var buf = reversi_game.board.data();
    worker.postMessage(buf);
};

