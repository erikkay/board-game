var worker = new Worker('minmax.js');
worker.addEventListener('message', function(e) {
    console.log("worker said: ", e.data);
}, false);

var data = [[
        [[1,-15],[2,19]],[[18,23],[4,3]]
    ],[
        [[2,1],[7,8]],[[9,10],[-2,5]]
    ],[
        [[-1,-30],[4,7]],[[20,-1],[-1,-5]]
    ]];
worker.postMessage(data);
