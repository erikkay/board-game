var board_canvas;

function updateDisplay(board) {
    var canvas = document.getElementById("board");
    var ctx = canvas.getContext("2d");
    var size = canvas.width / board.size;
    ctx.fillStyle = "rgb(64,155,64)";
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
    for (var col = 0; col < board.size; col++, x += size) {
	var y = size / 2;
	for (var row = 0; row < board.size; row++, y += size) {
	    var p = board.get(col, row);
	    if (p == board.EMPTY) {
		continue;
	    } else if (p == board.P1) {
		ctx.fillStyle = "white";
	    } else if (p == board.P2) {
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

function getSquare(x, y) {
    var w = board_canvas.width / 8;
    var h = board_canvas.height / 8;
    
    var col = (x / w) ^ 0;
    var row = (y / h) ^ 0;
    return [col, row];
}

window.addEventListener('load', function(e) {
    board_canvas = document.getElementById("board");
    board_canvas.addEventListener('click', function(e) { 
	square = getSquare(e.x, e.y);
    }, false);
    board_canvas.addEventListener('mousemove', function(e) {
	square = getSquare(e.x, e.y);
    }, false);
}, false);

