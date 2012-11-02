var Board = function(size) {
    this.EMPTY = 0;
    this.P1 = 1;
    this.P2 = 2;
    this.state = {}; 

    var adjacent_cache;
  
    this.index = function(x, y) { 
	if (x < 0 || x >= this.state.size || y < 0 || y >= this.state.size)
	    return -1;
	return x + y * this.state.size;
    }

    this.doMove = function(begin_index, end_index, delta) {
	var new_board = new Board(this.state.size);
	for (var i = 0; i < this.state.square_count; i++) {
	    new_board.state.board_array[i] = this.state.board_array[i];
	}
	for (var i = begin_index; i != (end_index + delta); i += delta) {
	    new_board.state.board_array[i] = this.state.player;
	}
	new_board.state.player = this.opposingPlayer();
	new_board.state.last_move = begin_index;
	return new_board;
    }

    this.create = function(size) {
	this.state.score = 0;
        this.state.size = size;
	this.state.square_count = size * size;
	this.state.board_array = new Uint8Array(this.state.square_count);
	this.state.player = this.P1;
	if (!adjacent_cache) {
	    adjacent_cache = new Array(size * size);
	    for (var x = 0; x < size; x++) {
		for (var y = 0; y < size; y++) {
		    var i = this.index(x, y);
		    adjacent_cache[i] = new Array();
		    var add_adjacent = function(a) {
			if (a >= 0 && a < adjacent_cache.length) {
			    adjacent_cache[i].push(a);
			}
		    }
		    add_adjacent(this.index(x - 1, y - 1));
		    add_adjacent(this.index(x, y - 1));
		    add_adjacent(this.index(x + 1, y - 1));
		    add_adjacent(this.index(x - 1, y));
		    add_adjacent(this.index(x + 1, y));
		    add_adjacent(this.index(x - 1, y + 1));
		    add_adjacent(this.index(x, y + 1));
		    add_adjacent(this.index(x + 1, y + 1));
		}
	    }
	}
    }

    this.size = function() { return this.state.size; }
    this.square_count = function() { return this.state.square_count; }
    this.data = function() { return this.state.board_array; }

    this.set_data = function(ba) {
	this.state.board_array = ba;
    }
    
    this.set = function(x, y, val) {
	var i = this.index(x, y);
        if (i < 0) {
	    console.log("out of bounds", x, y, this.size);
	    return;
	}
	if (val < this.EMPTY || val > this.P2) {
	    console.log("illegal value", val);
	    return;
	}
	this.state.board_array[i] = val;
    }
    
    // if one arg, x is treated as index
    this.get = function(x, y) {
        var i;
	if (y == undefined)
	    i = x;
        else
	    i = this.index(x, y);
        if (i < 0) {
	    console.log("out of bounds", x, y, this.size);
	    return;
	}
	return this.state.board_array[i];
    }

    this.counts = function() {
	var c = [0, 0, 0];
	for (var i = 0; i < this.state.board_array.length; i++) {
	    var val = this.state.board_array[i];
	    if (val <= this.EMPTY)
		c[0]++;
	    else if (val == this.P1)
		c[1]++;
	    else if (val == this.P2)
		c[2]++;
	    else
		console.log("illegal value in board", i, val);
	}
	return c;
    }

    this.score = function() { return this.state.score; }
    this.setScore = function(s) { this.state.score = s; }

    this.currentPlayer = function() {
	return this.state.player;
    }

    this.opposingPlayer = function() {
	return this.state.player == this.P1 ? this.P2 : this.P1;
    }

    this.adjacent = function(x,y) {
	var i = this.index(x, y);
        if (i < 0) {
	    console.log("out of bounds", x, y, this.state.size);
	    return;
	}
	return adjacent_cache[i];
    }

    this.create(size);
};
