function Greedy(start, end, speed, boardGraph) {
            isRunning=true;
            let path = new Array(boardGraph.vert);
            let dist = new Array(boardGraph.vert);
            for (let i = 0; i < boardGraph.vert; i++) {
                path[i] = -1;
                dist[i] = Number.MAX_SAFE_INTEGER;
            }
            let openList = new PriorityQueue();
            let closedList = new Map();
            let foundEnd = false;
            openList.enqueue(start, 0);
            while (foundEnd == false && !(openList.isEmpty())) {

                let vertex = openList.dequeue();
                let currVertex = vertex.element;
                if(currVertex == null){
                    openList.clear();
                }
                else{
                    if(document.getElementById(currVertex).className == "weightedNode"){
                        updateNode(currVertex,"checkedWeightedNode",speed);
                    }
                    else if (document.getElementById(currVertex).className != "start" && 
                    document.getElementById(currVertex).className != "wall" &&
                    foundEnd == false) {
                        updateNode(currVertex, "checked",speed);
                    }
                min = Number.MAX_SAFE_INTEGER;
                for (let i = 0; i < boardGraph.data.get(currVertex).length; i++) {
                    let nextVertex = boardGraph.data.get(currVertex)[i][0];
                    let f = boardGraph.data.get(currVertex)[i][1] + Manhattan(nextVertex, end);

                    if (document.getElementById(nextVertex).className == "end") {
                        foundEnd = true;
                        path[nextVertex] = currVertex;
                        i += boardGraph.data.get(currVertex).length;
                    }
                    else {
                        if (openList.isinPriorityQueue(nextVertex) && openList.items[openList.isinPriorityQueue(nextVertex)].priority <= f) {
                        }
                        else if (closedList.has(nextVertex)) {
                        }
                        else {
                            openList.enqueue(nextVertex, f);
                            path[nextVertex] = currVertex;

                        }
                    }


                }
                closedList.set(currVertex, vertex.priority);
            }
            let shortestP = boardGraph.Paths(path, end);
            for (let i = shortestP.length - 1; i >= 0; i--) {

                if(i == shortestP.length-1){
                    updateNode(`${shortestP[i]}`, "shortestPathStart",speed);
                }
                else{
                updateNode(`${shortestP[i]}`, "shortestPath",speed);
                }
            }
            if(foundEnd){
                updateNode(end,"shortestPathEnd",speed);
                }
                else{
                    updateNode(end,"end",speed);
                }
            }
        }