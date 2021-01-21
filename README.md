Pathfinding Visualizer
Dijkstras (weighted) - finds shortest path by finding the next node with the smallest cost and repeating this process until the target is reached (guarentees the shortest path)
A* (weighted) - similar to Dijkstras, but utilizes heuristics to find the shortest path much faster than Dijkstras (guarentees the shortest path)
Greedy Best (weighted)) - A more heuristic heavy version of A* (does not guarentee shortest path)
Breath-first Search (unweighted) - nearly identical to Dijkstras, but does account for the "cost" of nodes (guarentee the shortest path)
Depth-first Search (unweighted) - a poor pathfinding algorithm that travels down one path until failure, after which it backtracks and repeats the process (does not guarentee the shortest path)
