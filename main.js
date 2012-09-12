function center(width, height) {
    var top = window.screen.availLeft + 
	(window.screen.availHeight/2 - height/2) ^ 0;
    var left = window.screen.availTop + 
	(window.screen.availWidth/2 - width/2) ^ 0;
    return [left, top];
}

chrome.app.runtime.onLaunched.addListener(function() {
    var size = 400;
    var title = 24; //29;
    var w = size;
    var h = size + title;
    var pos = center(w, h);
    console.log(pos);
    chrome.app.window.create('board.html', {
	defaultLeft: pos[0],
	defaultTop: pos[1],
	width: w,
	height: h,
	maxWidth: w,
	maxHeight: h,
	minWidth: w,
	minHeight: h,
	frame: 'chrome'
    });
});
