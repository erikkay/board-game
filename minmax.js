importScripts("board_state.js");
importScripts("reversi.js");

var reversi = new Reversi();

self.addEventListener('message', function(e) {
    var board = new Board(8);
    board.set_data(e.data);
    var ret = playMax(-Infinity, Infinity, board, 3);
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
    log(alpha,beta,depth)
    if (depth == 0) return reversi.score(board);
    var value = -Infinity;
    var children = reversi.validMoves(board);
    log(board, "children", children);
    for (var i = 0; i <children.length; i++) {
        var child = children[i];
        value = max(value, playMin(alpha,beta,child,depth-1));
        if(value > beta) return value;
        if(value > alpha) alpha = value;
    }
    return value;
}
function playMin(alpha,beta,node){
    if (depth == 0) return reversi.score(board);
    var value = Infinity;
    var children = reversi.validMoves(board);
    for (var i = 0; i <children.length; i++) {
        var child = children[i];
        value = min(value, playMax(alpha,beta,child,depth-1));
        if(value < alpha) return value;
        if(value < beta) beta = value;
    }
    return value;
}

//Helper functions
function min(a,b){
    return (a < b) ? a : b;
}
function max(a,b){
    return (a > b) ? a : b;
}

