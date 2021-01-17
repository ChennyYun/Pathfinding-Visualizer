function createBoard(board) {
    let table = "", nodeID, nodeClass, currRow, currHTMLRow;
    let count = 0;
    for (let r = 0; r < board.height; r++) {
        currRow = [];
        currHTMLRow = `<tr id="0${r}">`;
        for (let c = 0; c < board.width; c++) {
            nodeID = `${count}`;
            count++;
            if (r == 0 && c == 0) {
                nodeClass = "start";
            } else {
                nodeClass = "empty";
            }

            currHTMLRow += `<td id = ${nodeID} class = ${nodeClass}> </td> `;
        }
        table += `${currHTMLRow} </tr>`;
    }
    boardGraph = new graph(count, board.height, board.width);

    let boardHTML = document.getElementById("board");
    boardHTML.innerHTML = table;
    for (let i = 0; i < count; i++) {
        if (!(i % boardGraph.width == board.width - 1)) {
            boardGraph.addEdge(i, i + 1, 1);
        }
        if (i + boardGraph.width < count) {
            boardGraph.addEdge(i, i + boardGraph.width, 1);
        }
    }
    return boardGraph;
}
function createWall(id, boardGraph) {
    document.getElementById(id).className = "wall";
    boardGraph.removeEdges(id);

}
function removeWall(id, boardGraph) {
    document.getElementById(id).className = "empty";
    boardGraph.addEdges(id, 1);
}
function changeStatus(id, table, weight) {
    if (weight == 10) {
        addWeightedNode(id, table);

    }
    else {
        if (["checked", "checkedWeightedNode", "shortestPathWeightedNode", "shortestPath",].includes(document.getElementById(id).className)) {
            createWall(id, table);
        }
        else if (document.getElementById(id).className == "weightedNode") {
            document.getElementById(id).className = "empty";
            boardGraph.removeEdges(id);
            boardGraph.addEdges(id, 1);
        }
        else if (document.getElementById(id).className == "empty") {
            createWall(id, table);

        }
        else if (document.getElementById(id).className == "wall") {
            removeWall(id, table);

        }
    }
}
function addEventListerners(boardGraph) {
    let mouseDown = false;
    let onStart = false;
    let onEnd = false;
    let onshortestPathStart = false;
    let onshortestPathEnd = false;
    let prevNode = "empty";
    let wPressed = false;
    window.addEventListener('mouseup', function () {
        mouseDown = false;
        onStart = false;
        onEnd = false;
    });
    document.addEventListener('keydown', function (event) {
        if (event.key == 'w') {
            wPressed = true;
        }
    });
    document.addEventListener('keyup', function (event) {
        if (event.key == 'w') {
            wPressed = false;
        }

    });
    ondragstart = function () {
        return false;
    };
    for (let i = 0; i < boardGraph.vert; i++) {
        document.getElementById(i).addEventListener('mouseup', function () {
            mouseDown = false;
            onStart = false;
            onEnd = false;
            onshortestPathStart = false;
            onshortestPathEnd = false;
        });
        document.getElementById(i).addEventListener('mousedown', function () {
            mouseDown = true;
            if (!isRunning) {
                if (document.getElementById(i).className == "start") { onStart = true; }
                else if (document.getElementById(i).className == "end") { onEnd = true; }
                else if (document.getElementById(i).className == "shortestPathEnd") { onshortestPathEnd = true; }
                else if (document.getElementById(i).className == "shortestPathStart") { onshortestPathStart = true; }
                else if (wPressed == true) {
                    changeStatus(i, table, 10);
                }
                else {
                    changeStatus(i, table, 1);
                }
            }
            return;
        });

        document.getElementById(i).addEventListener('mouseover', function () {
            if (!isRunning) {
                if (mouseDown == true) {
                    if (onshortestPathStart == true) {
                        resetNodes(table);
                        document.getElementsByClassName("start")[0].className = prevNode;
                        prevNode = document.getElementById(i).className;
                        document.getElementById(i).className = "start";
                        onshortestPathStart = false;
                    }
                    else if (onshortestPathEnd == true) {
                        resetNodes(table);
                        document.getElementsByClassName("end")[0].className = prevNode;
                        prevNode = document.getElementById(i).className;
                        removeWall(i, table);
                        document.getElementById(i).className = "end";
                        onshortestPathStart = false;
                    }
                    if (onStart == true) {
                        if (document.getElementById(i).className != "end") {
                            if (prevNode == "wall") { createWall(parseInt(document.getElementsByClassName("start")[0].id), table); }
                            else if (prevNode == "weightedNode") {
                                let prevNodeId = parseInt(document.getElementsByClassName("start")[0].id);
                                document.getElementsByClassName("start")[0].className = prevNode;
                                addWeightedNode(prevNodeId, table);
                            }
                            else {
                                let prev = document.getElementsByClassName("start")[0];
                                prev.className = prevNode;
                                table.addEdges(parseInt(prev.id), 1);

                            }
                            prevNode = document.getElementById(i).className;
                            removeWall(i, table);
                            document.getElementById(i).className = "start";
                        }
                    }
                    else if (onEnd == true) {
                        if (document.getElementById(i).className != "start") {
                            if (prevNode == "wall") { createWall(parseInt(document.getElementsByClassName("end")[0].id), table); }
                            else if (prevNode == "weightedNode") {
                                let prevNodeId = parseInt(document.getElementsByClassName("end")[0].id);
                                document.getElementsByClassName("end")[0].className = prevNode;
                                addWeightedNode(prevNodeId, table);
                            }
                            else {
                                let prev = document.getElementsByClassName("end")[0];
                                prev.className = prevNode;
                                table.addEdges(parseInt(prev.id), 1);

                            }
                            prevNode = document.getElementById(i).className;
                            removeWall(i, table);
                            document.getElementById(i).className = "end";
                        }
                    }

                    else if (wPressed == true) {
                        changeStatus(i, table, 10);
                    }
                    else {
                        changeStatus(i, table, 1);
                    }
                }
            }
        });
    }

}
function onEdge(Vertex, boardGraph) {
    return (Vertex % boardGraph.width == 0 ||
        Vertex % boardGraph.width == boardGraph.width - 1 ||
        Vertex - boardGraph.width < 0 ||
        Vertex + boardGraph.width > boardGraph.vert);
}
function generateMaze(start, end, boardGraph) {
    start = 0;
    if (!isRunning) {
        boardGraph = createBoard(new board(19, 51));
        let edges = _.cloneDeep(boardGraph.data);
        let visited = new Array(boardGraph.vert);
        for (let i = 0; i < boardGraph.vert; i++) {
            if (!(i == start || i == end)) {
                createWall(i, boardGraph);
                visited[i] = false;
            }
        }
        removeWall(0, boardGraph);
        document.getElementById('0').className = "start";
        removeWall(end, boardGraph);
        document.getElementById(end).className = "end";

        visited[0] = true;

        function helper(start, boardGraph, edges) {

            let direction = Math.floor(Math.random() * (edges.get(start).length));
            for (let i = 0; i < edges.get(start).length; i++) {
                direction = (direction + i) % edges.get(start).length;
                let adjVertex = edges.get(start)[direction][0];
                let nextAdjVertex = adjVertex + (adjVertex - start);
                if (document.getElementById(nextAdjVertex).className == "wall"
                    && document.getElementById(adjVertex).className == "wall") {
                    removeWall(adjVertex, boardGraph);
                    removeWall(nextAdjVertex, boardGraph);
                    helper(nextAdjVertex, boardGraph, edges);

                }
            }
        }
        helper(start, boardGraph, edges);
        addEventListerners(boardGraph);
        return boardGraph;
    }
}
var delay = 0;
function updateNode(pos, val, speed) {
    window.setTimeout(function () {
        document.getElementById(pos).className = `${val}`;
        if (val == "shortestPathEnd" || val == "end") {
            isRunning = false;
        }
    }, delay += speed);
}
function addWeightedNode(pos, boardGraph) {
    document.getElementById(pos).className = "weightedNode";
    boardGraph.removeEdges(pos);
    boardGraph.addEdges(pos, 10);
}
function resetBoard() {
    if (!isRunning) {
        boardGraph = createBoard(new board(19, 51));
        document.getElementById(0).className = "start";
        document.getElementById(499).className = "end";
        addEventListerners(boardGraph);
        delay = 0;
        return boardGraph;
    }
}
function resetNodes(boardGraph) {
    for (let i = 0; i < boardGraph.vert; i++) {
        currNode = document.getElementById(i);
        if(currNode.className == "checkedWeightedNode" || currNode.className == "shortestPathWeightedNode"){
            currNode.className = "weightedNode";
        }
        if (currNode.className == "checked" || currNode.className == "shortestPath") {
            currNode.className = "empty";
        }
        if (currNode.className == "shortestPathEnd") {
            currNode.className = "end";
        }
        if (currNode.className == "shortestPathStart") {
            currNode.className = "start";
        }
    }
}
function start() {
    if (!isRunning) {
        resetNodes(table);
        let start = document.getElementsByClassName("start")[0].id;
        start = parseInt(start);
        let end = document.getElementsByClassName("end")[0].id;
        end = parseInt(end);
        let speed = 0;
        if (document.getElementById("selectedSpeed").innerHTML == "Fast") {
            speed = 10;

        }
        if (document.getElementById("selectedSpeed").innerHTML == "Moderate") {
            speed = 20;
        }
        if (document.getElementById("selectedSpeed").innerHTML == "Slow") {
            speed = 100;
        }
        if (document.getElementById("selectedAlgo").innerHTML == "Dijkstras Algorithm") {
            dijkstra(start, end, speed, table);
        }
        if (document.getElementById("selectedAlgo").innerHTML == "A* Search") {

            Astar(start, end, speed, table);
        }
        if (document.getElementById("selectedAlgo").innerHTML == "Greedy Best Search") {

            Greedy(start, end, speed, table);
        }
        if (document.getElementById("selectedAlgo").innerHTML == "Breath-first Search") {
            bfs(start, end, speed, table);
        }
        if (document.getElementById("selectedAlgo").innerHTML == "Depth-first Search") {
            dfs(start, end, speed, table);
        }
        delay = 0;
    }
}

function openModal() {
    modal.style.display = "block";
}
for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function () {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
        }
    })
}
for (const dropdown of document.querySelectorAll(".custom-select-wrapper")) {
    dropdown.addEventListener('click', function () {
        this.querySelector('.custom-select').classList.toggle('open');
    })
}

window.addEventListener('click', function (e) {
    for (const select of document.querySelectorAll('.custom-select')) {
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    }
});
var  span = document.getElementsByClassName("close")[0]; 
var modal = document.getElementById("Algorithm Descriptions");
span.onclick = function () {
    modal.style.display = "none";
}

var table = createBoard(new board(19, 51));
addEventListerners(table);
document.getElementById(0).className = "start";
document.getElementById(499).className = "end";