chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('board.html', {
    width: 400,
    height: 400,
    maxWidth: 400,
    minWidth: 400,
    minHeight: 400,
    frame: 'chrome'
  });
});
