var Reversi = function() {
    this.validMoves = function(b) {
	var valid = new Array();
	var cur = b.currentPlayer();
	var opp = b.opposingPlayer();
	for (var x = 0; x < b.size; x++) {
	    for (var y = 0; y < b.size; y++) {
		if (b.get(x, y) <= 0) {
		    var adjacent_list = b.adjacent(x, y);
		    var candidate = b.index(x, y);
		    for (var a = 0; a < adjacent_list.length; a++) {
			var adjacent = adjacent_list[a];
			if (b.get(adjacent) == opp) {
			    var delta = adjacent - candidate;
			    var next_x = (adjacent % b.size);
			    var delta_x = next_x - x;
			    var next_y = (adjacent / b.size) ^ 0;
			    var delta_y = next_y - y;
			    next_x += delta_x;
			    next_y += delta_y;
			    var next_index = b.index(next_x, next_y);
			    while (next_index >= 0) {
				//log(candidate, next_index);
				var next_val = b.get(next_index);
				if (next_val == cur) {
				    //log("valid move", cur, candidate);
				    var next_board =
					b.doMove(adjacent, next_index, delta);
				    valid.push(next_board);
				    break;
				} else if (next_val == b.EMPTY) {
				    break;
				}
				next_x += delta_x;
				next_y += delta_y;
				next_index = b.index(next_x, next_y);
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
	if (b.currentPlayer() == b.P1)
	    b.score = counts[1] - counts[2];
	else
	    b.score = counts[2] - counts[1];
	return b.score;
    }
}

