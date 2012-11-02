var Board = function(size) {
    this.EMPTY = 0;
    this.P1 = 1;
    this.P2 = 2;
    var adjacent_cache;
   
    this.index = function(x, y) { 
	if (x < 0 || x >= this.size || y < 0 || y >= this.size)
	    return -1;
	return x + y * this.size;
    }

    this.doMove = function(begin_index, end_index, delta) {
	var new_board = new Board(this.size);
	for (var i = 0; i < this.square_count; i++) {
	    new_board.board_array[i] = this.board_array[i];
	}
	for (var i = begin_index; i < end_index; i += delta) {
	    new_board.board_array[i] = this.player;
	}
	new_board.player = this.opposingPlayer();
	return new_board;
    }    

    this.create = function(size) {
	this.score = 0;
        this.size = size;
	this.square_count = size * size;
	this.board_array = new Uint8Array(this.square_count);
	this.player = this.P1;
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

    this.data = function() { return this.board_array; }

    this.set_data = function(ba) {
	this.board_array = ba;
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
	this.board_array[i] = val;
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
	return this.board_array[i];
    }

    this.counts = function() {
	var c = [0, 0, 0];
	for (var i = 0; i < this.board_array.length; i++) {
	    if (this.board_array[i] <= this.EMPTY)
		c[0]++;
	    else if (this.board_array[i] == this.P1)
		c[1]++;
	    else if (this.board_array[i] == this.P2)
		c[2]++;
	    else
		console.log("illegal value in board", i, this.board_array[i]);
	}
	return c;
    }

    this.currentPlayer = function() {
	return this.player;
    }

    this.opposingPlayer = function() {
	return this.player == this.P1 ? this.P2 : this.P1;
    }

    this.adjacent = function(x,y) {
	var i = this.index(x, y);
        if (i < 0) {
	    console.log("out of bounds", x, y, this.size);
	    return;
	}
	return adjacent_cache[i];
    }

    this.create(size);
};
