function bfs(start, end, speed, boardGraph) {
    isRunning=true;
    let dist = new Array(boardGraph.vert);
    let path = new Array(boardGraph.vert);
    let unchecked = new Queue(boardGraph.vert);
    let checkedNodes = new Map();
    let foundEnd = false;


    for (let i = 0; i < boardGraph.vert; i++) {
        dist[i] = Number.MAX_SAFE_INTEGER;
        path[i] = -1;
    }
    unchecked.enqueue(start);
    dist[start] = 0;
    while (!(unchecked.isEmpty())) {
        currVertex = unchecked.dequeue();
        checkedNodes.set(currVertex, 1);
        if(document.getElementById(currVertex).className == "end"){
            updateNode(currVertex,"checkedEnd",speed);
            foundEnd = true;
        }
        if (document.getElementById(currVertex).className != "start" &&
            document.getElementById(currVertex).className != "end" &&
            foundEnd == false) {
            updateNode(currVertex, "checked",speed);
        }
        for (let i = 0; i < boardGraph.data.get(currVertex).length; i++) {
            let nextVertex = boardGraph.data.get(currVertex)[i][0];
            if (!(checkedNodes.has(nextVertex)) && 1 + dist[currVertex] < dist[nextVertex]) {
                dist[nextVertex] = 1 + dist[currVertex];
                path[nextVertex] = currVertex;
                unchecked.enqueue(nextVertex);
            }
        }

    }
    let shortestP = boardGraph.Paths(path, end);
    for (let i = shortestP.length - 1; i >= 0; i--) {

        if(i == shortestP.length-1){
            updateNode(`${shortestP[i]}`, "shortestPathStart",speed);
        }
        else{
            if(document.getElementById(shortestP[i]).className == "weightedNode"){
                updateNode(`${shortestP[i]}`, "shortestPathWeightedNode",speed);
            }
            else{
            updateNode(`${shortestP[i]}`, "shortestPath",speed);
            }
        }
    }
    if(foundEnd){
        updateNode(end,"shortestPathEnd",speed);
        }
        else{
            updateNode(end,"end",speed);
        }
    return dist;

}