importScripts("board_state.js");
importScripts("reversi.js");

var reversi = new Reversi();

self.addEventListener('message', function(e) {
    var board = new Board(8);
    board.set_data(e.data);
    var ret = playMax(-Infinity, Infinity, board, 3);
    log(ret.score);
    self.postMessage(ret);
}, false);

function log() {
    var args = Array.prototype.slice.call(arguments);
    var str = args.join(",");
    self.postMessage(str);
}

// derived from https://github.com/ForbesLindesay/alpha-beta-pruning
//Main Algorithm
function playMax(alpha,beta,board,depth){
    if (depth == 0) {
	reversi.score(board);
	return board;
    }
    var value = -Infinity;
    var children = reversi.validMoves(board);
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
	var minBoard = playMin(alpha,beta,child,depth-1);
        value = Math.max(value, minBoard.score);
        if(value > beta) break;
        if(value > alpha) alpha = value;
    }
    board.score = value;
    return board;
}

function playMin(alpha,beta,board,depth){
    if (depth == 0) {
	reversi.score(board);
	return board;
    }
    var value = Infinity;
    var children = reversi.validMoves(board);
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
	var maxBoard = playMax(alpha,beta,child,depth-1);
        value = Math.min(value, maxBoard.score);
        if(value < alpha) break;
        if(value < beta) beta = value;
    }
    board.score = value;
    return board;
}


