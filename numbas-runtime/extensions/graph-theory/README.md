# Graph theory extension for Numbas

This extension provides some functions for working with and drawing graphs in Numbas.

## JME data types

This extension adds three new data types:

### `vertex`

A vertex in a graph. It can be automatically converted to a vector corresponding to its position.
It also has a label.

### `edge`

An edge linking two vertices, identified by their indices in the graph's list of vertices.

An edge can be _directed_ or not.

Each edge has a _weight_, which is used by the auto-layout routine, and some graph-theoretic algorithms.

An edge can also have a dictionary of _styles_ attached. The recognised styles are:

* `opacity` - A value between 0 and 1. The default is 1.
* `width` - The width of a line drawn to show the edge. The default is 1.
* `dash` - Either a boolean, or a string giving an SVG dasharray pattern. The default is `false`.

### `graph`

A graph, consisting of a collection of vertices and edges, and a corresponding adjacency matrix.

The adjacency matrix has one row and one column for each vertex. The entry `(i,j)` contains `1` if vertices `i` and `j` are adjacent, and `0` otherwise.

## JME functions

Many of these functions take an adjacency matrix as an argument.
A value of 0 in position `[i][j]` means that there is no edge from vertex `i` to `j`; a positive value means that there is an edge, with any value less than 1 being drawn as a dashed line, and a value of 1 being drawn as a solid line.

### `edge(from, to, [weight], [directed], [label], [style])`

Create an edge linking vertices `from` and `to`. (These indices have no particular meaning without reference to a list of vertices)

### `from(edge)`

The index of the vertex at the start of the edge.

### `to(edge)`

The index of the vertex at the end of the edge.

### `ends(edge)`

A list `[from,to]` giving the indices of the vertices the edge links.

### `weight(edge)`

The edge's weight.

### `directed(edge)`

`true` if the edge is directed, `false` otherwise.

### `label(edge)`

The edge's label.

### `vertex(x, y, [label])` or `vertex(pos, [label])`

Create a graph vertex with coordinates given by the two numbers `(x,y)` or the vector `pos`, and an optional label string.

Vertices can automatically be converted to vectors, so `v[0]` will return the x-coordinate of a vertex `v`.

### `label(vertex)`

The vertex's label.

### `graph(adjacency_matrix, [vertices], [edges])` or `graph(edges)` or `graph(vertices, [edges])`

Create a graph from either:

* an adjacency matrix and optional lists of vertices and edges
* just a list of edges
* a list of vertices and an optional list of edges

### `adjacency_matrix(graph)`

The graph's adjacency matrix.

### `vertices(graph)`

The graph's list of vertices.

### `edges(graph)`

The graph's list of edges.

### `set_vertex_positions(graph, positions)`

Set the positions of the graph's vertices to the corresponding values in the given list of vectors.

### `set_vertex_labels(graph, labels)`

Set the labels of the graph's vertices to the corresponding values in the given list of strings.

### `set_edge_weights(graph, weights)`

Set the weights of the graph's edges to the corresponding values in the given list of numbers.

### `set_edge_labels(graph, labels)`

Set the labels of the graph's edges to the corresponding values in the given list of strings.

### `set_edge_styles(graph, styles)`

Set the styles of the graph's edges to the corresponding values in the given list of dictionaries.

### `draw(graph)`

Produce a drawing of the graph, as an `html` data type.
If the graph's vertices haven't been positioned, the vertices are laid out automatically.

Any vertex or edge labels are shown.

### `auto_layout(graph)`

Lay out the graph's vertices automatically. The routine tries to ensure that vertices are separated and spaced according to edge weights.
It doesn't do a good job of ensuring that edges don't cross unnecessarily.

### `bipartite_layout(graph, lefts)`

Lay out the graph as a bipartite graph, with vertices arranged in two vertical rows. The list `lefts` is a list of booleans determining whether the corresponding vertices are on the left or right sides.

### `vertex_degrees(graph)`

The degrees of the graph's vertices, as a list of integers.

### `g1 + g2`

The union of two graphs.

### `graph + vertex`

Add a vertex to a graph.

### `graph + vertices`

Add a list of vertices to a graph.

### `graph + edge`

Add an edge to a graph.

### `graph + edges`

Add a list of edges to a graph.

### `connected_components(graph)`

The connected components of the given graph, as a list of lists, each giving the indices of the vertices in that component.

### `is_connected(graph)`

`true` if the graph has only one connected component.

### `is_tree(graph)`

`true` if the graph is a tree - it contains no cycles.

### `largest_connected_component(graph)`

The largest connected component in the given graph, as a list of indices of the vertices in that component.

### `subgraph(graph, indices)`

The subgraph of the given graph containing only the vertices at the given indices.

### `subgraph(graph, edges)`

The subgraph of the given graph, containing only the given edges and the vertices they join.

### `cartesian_product(graph1, graph2)`

The cartesian product of two graphs. A graph with:

* A vertex for each pair `(a,b)` of vertices, with `a in graph1` and `b in graph2`.
* An edge between `(a1,b1)` and `(a2,b2)` if and only if `a1=a2` and `b1` is adjacent to `b2` in `graph2`, or `b1=b2` and `a1` is adjacent to `a2` in `graph1`.

### `direct_product(graph1, graph2)`

The direct product, or tensor product, of two graphs. A graph with:

* A vertex for each pair `(a,b)` of vertices, with `a in graph1` and `b in graph2`.
* An edge between `(a1,b1)` and `(a2,b2)` if and only if `a1` and `a2` are adjacent in `graph1`, and `b1` and `b2` are adjacent in `graph2`.

### `permute_vertices(permutation,graph)`

Permute the vertices of the given graph, returning a new graph.

`permutation` is either a list of numbers or a value from the permutations extension, giving each vertex in the original graph an index in the permuted graph.

The edges in the returned graph follow the permutation, so an edge `(a,b)` in the original graph will be `(p(a), p(b))` in the permuted graph.

### `is_isomorphism(permutation, graph)`

`true` if the given permutation is an isomorphism of the graph: there is an edge `(p(a), p(b))` in the permuted graph if and only if there is an edge `(a,b)` in the original graph.

### `kruskals_algorithm(graph)`

Perform Kruskal's algorithm on the given graph, to return a minimum spanning forest.

Returns a list of the edges in the minimum spanning tree.

### `kruskals_algorithm_working(graph)`

A description of the steps carried out for Kruskal's algorithm on the given graph.

### `prims_algorithm(graph)`

Perform Prim's algorithm on the given graph, to return a minimum spanning tree.
The graph must be connected.

Returns a list of the edges in the minimum spanning tree.

### `prims_algorithm_working(graph)`

A description of the steps carried out for Prim's algorithm on the given graph.

### `random_planar_graph(n, [p_keep_noncrossing], [p_keep_crossing])`

Generate a random planar graph with `n` vertices.

You can optionally give probabilities for keeping intersecting or non-intersecting edges, which can produce non-planar or non-connected edges.

### `weight_matrix(graph)`

A matrix with one row and one column for each vertex. The entry `(i,j)` contains the weight of the edge from vertex `i` to vertex `j` if there is one, or `0` otherwise.

### `weight_table(graph)`

An HTML table showing the weights of the edges in the graph.

The entry `(i,j)` contains the weight of the edge from vertex `i` to vertex `j` if there is one, or `-1` otherwise.
