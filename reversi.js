var Reversi = function() {
    this.validMoves = function(b) {
	var valid = new Array();
	var cur = b.currentPlayer();
	var opp = cur == b.P1 ? b.P2 : b.P1;
	for (var x = 0; x < b.size; x++) {
	    for (var y = 0; y < b.size; y++) {
		if (b.get(x, y) <= 0) {
		    var adjacent = b.adjacent(x, y);
		    for (var a in adjacent) {
			log("adjacent", a, b.get(a));
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

    this.score = function(b) {
	var counts = b.counts();
	if (b.currentPlayer == b.P1)
	    return counts[1] - counts[2];
	else
	    return counts[2] - counts[1];
    }
}

