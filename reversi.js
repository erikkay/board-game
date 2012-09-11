var Reversi = function() {
    this.board = new Board(8);
    this.board.set(4,4,Board.P1);
    this.board.set(4,5,Board.P2);
    this.board.set(5,4,Board.P2);
    this.board.set(5,5,Board.P1);

    function getBoard() {
	return this.board;
    }

    function updateDisplay() {
	
    }

    function validMoves(b) {
	var valid = new Array();
	var cur = b.currentPlayer();
	var opp = cur == b.P1 ? b.P2 : b.P1;
	for (var x = 0; x < b.size; x++) {
	    for (var y = 0; y < b.size; y++) {
		if (b.get(x, y) <= 0) {
		    var adjacent = b.adjacent(x, y);
		    for (var a in adjacent) {
			if (b.get(a) == opp) {
			    var delta = a - index(x, y);
			    for (var next = a + delta; next < b.square_count; next += delta) {
				if (b.get(next) == cur) {
				    valid.push(a);
				    break;
				}
			    }
			}
		    }
		}
	    }
	}
	return valid;
    }

    function score(b) {
	var counts = b.counts();
	if (b.currentPlayer == b.P1)
	    return counts[1] - counts[2];
	else
	    return counts[2] - counts[1];
    }
}

var reversi_game = new Reversi();
