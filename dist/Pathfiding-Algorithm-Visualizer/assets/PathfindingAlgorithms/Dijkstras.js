function  dijkstra(start, end, speed,boardGraph) {
    isRunning = true;
    let V = boardGraph.vert;
    let dist = [];
    let path = new Array(V);
    let heap = new minHeap();

    for (let i = 0; i < V; i++) {
        dist.push(Number.MAX_SAFE_INTEGER);
        heap.array.push(heap.createNode(i, dist[i]));
        heap.pos.push(i);
        path[i] = -1;

    }

    heap.pos[start] = start;
    dist[start] = 0;
    heap.decreaseDist(start, dist[start]);
    heap.size = V;
    let foundEnd = false;
    while (!(heap.isEmpty())) {

        let newHeapNode = heap.removeMin();
        if(newHeapNode[1] == Number.MAX_SAFE_INTEGER){
            break;
        }
        var u = newHeapNode[0];
        if (u == end){
            foundEnd = true;
        }
        if(document.getElementById(u).className == "weightedNode"){
            updateNode(u,"checkedWeightedNode",speed);
        }
        else if (document.getElementById(u).className != "start" && 
        document.getElementById(u).className != "wall" &&
        foundEnd == false) {
            updateNode(u, "checked",speed);
        }

        for (let i = 0; i < boardGraph.data.get(u).length; i++) {

            let v = boardGraph.data.get(u)[i][0];
            if (heap.isInMinHeap(v) && dist[u] != Number.MAX_SAFE_INTEGER &&
            boardGraph.data.get(u)[i][1] + dist[u] < dist[v]) {
                dist[v] = boardGraph.data.get(u)[i][1] + dist[u];
                heap.decreaseDist(v, dist[v]);
                path[v] = u;
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
}