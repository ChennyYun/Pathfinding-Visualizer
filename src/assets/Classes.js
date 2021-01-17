var isRunning = false;
class board {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.AdjacencyList = new Map();
    }
}
class node {
    constructor(ID, Class) {
        this.ID = ID;
        this.Class = Class;
    }
}
class graph {
    constructor(v,h,w) {
        this.vert = v;
        this.height = h;
        this. width = w;
        this.data = new Map();
    }

    addEdge(start, end, weight) {
        if (document.getElementById(start).className != "wall" && document.getElementById(end).className != "wall") {
            if(document.getElementById(start).className == "weightedNode" && document.getElementById(end).className == "weightedNode"){
                weight = 1;
            }
            else if(document.getElementById(start).className == "weightedNode" || document.getElementById(end).className == "weightedNode"){
                weight = 10;
            }
            let newNode = [end, weight];
            if (!(this.data.has(start))) {
                this.data.set(start, []);
            }
            if (!(this.data.get(start).includes(newNode))) {
                this.data.get(start).push(newNode);
            }

            newNode = [start, weight];
            if (!(this.data.has(end))) {
                this.data.set(end, []);
            }
            if (!(this.data.get(end).includes(newNode))) { 
                this.data.get(end).push(newNode);
            }
        }
    }

    removeEdges(Vertex) {
        for (let i = 0; i < this.data.get(Vertex).length; i++) {
            let currVertex = this.data.get(Vertex)[i][0];
            this.data.set(currVertex, this.data.get(currVertex).filter(function (value) {
                //document.getElementById("test").innerHTML += `[${this.data.get(currVertex)}]`;
                return value[0] != Vertex;
            }))
        }
        this.data.set(Vertex, []);
    }
    addEdges(Vertex,weight) {
        
        if (!(Vertex % this.width == 0)) {
                this.addEdge(Vertex, Vertex-1, weight);
    
        }
        if (!(Vertex % this.width == this.width-1)) {
        
            this.addEdge(Vertex, Vertex+1, weight);
          
        }
        if (Vertex - this.width >= 0) {
            
            this.addEdge(Vertex, Vertex - this.width, weight);
           
        }
        if (Vertex + this.width < this.vert) {
            
            this.addEdge(Vertex, Vertex + this.width, weight);
            
        }
    }

    Paths(path, j) {
        let array = [];
        while (path[j] !== -1) {
            array.push(path[j]);
            j = path[j];
        }
        return array;
    }
}
class Queue {
    constructor(size) {
        this.items = new Array(size);
        this.size = size;
        this.numOfElem = 0;
        this.rear = 0;
        this.head = null;
    }
    enqueue(element) {
        if (this.isEmpty()) {
            this.items[0] = element;
            this.head = 0;
            this.numOfElem += 1;
        }
        else {
            this.rear = (this.head + this.numOfElem) % this.items.length;
            this.items[this.rear] = element;
            this.numOfElem += 1;
        }
    }
    dequeue() {
        if (this.isEmpty()) {
            return;
        }
        let val = this.items[this.head];
        this.items[this.head] = null;
        this.head = (this.head + 1) % this.items.length;
        this.numOfElem -= 1;
        if (this.isEmpty()) {
            this.head = null;
        }
        return val;
    }
    isEmpty() {
        return (this.numOfElem == 0);
    }


}

class QElement {
    constructor(element, priority,ManhattanVal) {
        this.element = element;
        this.priority = priority;
        this.ManhattanVal = ManhattanVal;
    }
}

class PriorityQueue {
    constructor() {
        this.items = [];
        this.pos = new Map();
    }

    clear(){
        this.items = [];
        this.pos.clear();
    }
    enqueue(element, priority,ManhattanVal) {
        let qElement = new QElement(element, priority,ManhattanVal);
        let contain = false;
        
        for (let i = 0; i < this.items.length; i++) {
             if (this.items[i].priority > qElement.priority) {

                this.items.splice(i, 0, qElement);
                this.pos.set(element, i);
                contain = true;
                break;
            }
        }
        if (!contain) {
            this.items.push(qElement);
            this.pos.set(element, this.items.length - 1);
        }
    }
    dequeue() {
        if (this.isEmpty())
            return "Underflow";
        let element = this.items.shift();
        this.pos.delete(element);
        return element;
    }
    isEmpty() {
        return this.items.length == 0;
    }
    isinPriorityQueue(element) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].element == element) {
                return i;
            }
        }
        return false;
    }
}
class minHeap {
    constructor() {
        this.array = [];
        this.size = 0;
        this.pos = [];
    }
    isEmpty() {
        return this.size == 0;
    }
    createNode(v, dist) {
        let minHeapNode = [v, dist];
        return minHeapNode;
    }
    swapNodes(a, b) {
        let temp = this.array[a];
        this.array[a] = this.array[b];
        this.array[b] = temp;
    }
    heapify(idx) {
        let smallest = idx;
        let left = 2 * idx + 1;
        let right = 2 * idx + 2;

        if (left < this.size && this.array[left][1] < this.array[smallest][1]) {
            smallest = left;
        } if (right < this.size && this.array[right][1] < this.array[smallest][1]) {
            smallest = right;
        }
        if (smallest != idx) {
            this.pos[this.array[smallest][0]] = idx;
            this.pos[this.array[idx][0]] = smallest;
            this.swapNodes(smallest, idx);
            this.heapify(smallest);
        }
    }
    removeMin() {
        if (this.isEmpty()) {
            return;
        }
        let min = this.array[0];
        this.pos[this.array[this.size - 1][0]] = 0;
        this.pos[this.array[0][0]] = this.size - 1;
        this.array[0] = this.array[this.size - 1];
        this.size -= 1;
        this.heapify(0);
        return min;
    }
    decreaseDist(v, dist) {
        let i = this.pos[v];
        this.array[i][1] = dist;
        let parent = Math.floor((i - 1) / 2);
        while (i > 0 && (this.array[i][1] < this.array[parent][1])) {
            this.pos[this.array[i][0]] = parent;
            this.pos[this.array[parent][0]] = i;
            this.swapNodes(i, parent);
            i = parent;
            parent = Math.floor((i - 1) / 2);
        }

    }
    isInMinHeap(v) {
        return this.pos[v] < this.size;
    }

}