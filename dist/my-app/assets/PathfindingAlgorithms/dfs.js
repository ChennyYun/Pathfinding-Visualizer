function dfs(start, end, speed, boardGraph) {
    isRunning=true;
    function helper(start, end, speed, boardGraph, checkedList, path) {
        checkedList[start] = true;
        if (document.getElementById(start).className == "end"){
            updateNode(start,"checkedEnd",speed);
            foundEnd = true;
        }
        if (document.getElementById(start).className != "start" &&
        document.getElementById(start).className != "end" &&
        foundEnd == false) {
            updateNode(start, "checked",speed);
        }
        for (let i = 0; i < boardGraph.data.get(start).length; i++) {
            let adjVertex = boardGraph.data.get(start)[i][0];
            if (checkedList[adjVertex] == false) {
                path[adjVertex] = start;
                helper(adjVertex, end, speed, boardGraph, checkedList, path);
            }

        }
        return path
    }
    var foundEnd = false;
    let checkedList = new Array(boardGraph.vert);
    let path = new Array(boardGraph.vert);
    for (let i = 0; i < boardGraph.vert; i++) {
        checkedList[i] = false;
        path[i] = -1;
    }


    helper(start, end, speed, boardGraph, checkedList, path);
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