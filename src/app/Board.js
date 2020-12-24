
class board {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.boardArray = [];
    }
}
class node {
    constructor(ID, Class) {
        this.ID = ID;
        this.Class = Class;
    }
}

function createBoard(board) {
    let table = "", nodeID, nodeClass, currRow, currHTMLRow;
    for (let r = 0; r < board.height; r++) {
        currRow = [];
        currHTMLRow = `<tr id="row${r}">`;
        for (let c = 0; c < board.width; c++) {
            nodeID = `${r}_${c}`;
            if (r === 0 && c === 0) {
                nodeClass = "start";
            } else {
                nodeClass = "empty";
            }
            currHTMLRow += `<td id = "${nodeID}" class = "${nodeClass}"> </td> `
            newNode = new node(nodeID, nodeClass);
            table += `${currHTMLRow} </tr>`;
            let board = document.getElementById("board");
            board.innerHTML = tableHTML;
        }
    }
}
mainBoard = new board(50,15);
createBoard(mainBoard);