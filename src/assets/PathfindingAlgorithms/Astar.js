function Astar(start, end, speed, boardGraph) {
    isRunning = true;
    let path = new Array(boardGraph.vert);
    let dist = new Array(boardGraph.vert);
    let checkedList = new Array(boardGraph.vert);
    for (let i = 0; i < boardGraph.vert; i++) {
        path[i] = -1;
        dist[i] = Number.MAX_SAFE_INTEGER;
        checkedList[i] = false;
    }
    let openList = new PriorityQueue();
    let closedList = new Map();
    let foundEnd = false;
    let min = Number.MAX_SAFE_INTEGER;
    dist[start] = 0;
    let count = 0;
    openList.enqueue(start, 0, Manhattan(start,end));
    while (foundEnd == false && !(openList.isEmpty())) {
        let ifChecked = true;
        let vertex = openList.dequeue();
        let currVertex = vertex.element;
        while(ifChecked == true){
            if(checkedList[currVertex] == true){
                vertex = openList.dequeue();
                currVertex = vertex.element;
            }
            else{
                ifChecked = false;
            }
        }
        
        count+=1;
        checkedList[currVertex] = true;
        if (document.getElementById(currVertex).className != "start" &&
            document.getElementById(currVertex).className != "end" &&
            document.getElementById(currVertex).className != "wall") {
            if(document.getElementById(currVertex).className == "weightedNode"){
                updateNode(currVertex,"checkedWeightedNode",speed);
            }
            else{
            updateNode(currVertex, "checked",speed);
            }
        }
        min = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < boardGraph.data.get(currVertex).length; i++) {
            let nextVertex = boardGraph.data.get(currVertex)[i][0];
            let ManhattanVal = Manhattan(nextVertex,end);
            let f = dist[currVertex] + boardGraph.data.get(currVertex)[i][1] + ManhattanVal;
            if (document.getElementById(nextVertex).className == "end") {
                foundEnd = true;
                path[nextVertex] = currVertex;
                i += boardGraph.data.get(currVertex).length;
            }

            else {
                if (dist[currVertex] != Number.MAX_SAFE_INTEGER &&
                    boardGraph.data.get(currVertex)[i][1] + dist[currVertex] < dist[nextVertex]) {
                    dist[nextVertex] = boardGraph.data.get(currVertex)[i][1] + dist[currVertex];
                    path[nextVertex] = currVertex;
                }

                if (openList.isinPriorityQueue(nextVertex) && openList.items[openList.isinPriorityQueue(nextVertex)].priority <  f) {
                }
                else if (closedList.has(nextVertex) && closedList.get(nextVertex) < f) {
                }
                else {
                    if(checkedList[nextVertex] == false){
                    openList.enqueue(nextVertex, f, ManhattanVal);
        
                    }
                }
            }


        }
        closedList.set(currVertex, vertex.priority);
    }
    //document.getElementById("test1").innerHTML = checkedList;
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
function Manhattan(start, end) {
    let startRow = document.getElementById(start).parentElement.id;
    let endRow = document.getElementById(end).parentElement.id;
    let cross = Math.abs((startRow - endRow)*(endRow-startRow) - 
    (start % boardGraph.width - end % boardGraph.width)*(end % boardGraph.width - start % boardGraph.width));
    return Math.abs(startRow - endRow) + Math.abs(start % boardGraph.width - end % boardGraph.width)+ cross*.001;

}