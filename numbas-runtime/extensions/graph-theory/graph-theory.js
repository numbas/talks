Numbas.addExtension('graph-theory',['jme','jme-display','svgjs','graph-app'],function(extension) {
    const scope = extension.scope;
    var jme = Numbas.jme;

    class WorkingOut {
        constructor(num_columns, add_step_cb, render_cb) {
            this.steps = [];
            this.num_columns = num_columns;
            this.add_step_cb = add_step_cb;
            this.render_cb = render_cb;
        }

        add_step(data) {
            const extra = this.add_step_cb(data);
            Object.assign(extra,data);
            this.steps.push(extra);
        }

        render() {
            const container = document.createElement('div');
            container.classList.add('working-out');
            container.style.setProperty('--num-columns',this.num_columns);
            this.steps.forEach(step => {
                //const li = document.createElement('li');
                //li.classList.add('step');
                //ul.appendChild(li);
                this.render_cb(container,step);
            });
            return container;
        }
    }

    class Edge {
        constructor(from, to, weight, directed=false, label='',style={}) {
            this.from = from;
            this.to = to;
            this.weight = weight === undefined ? Numbas.math.randomrange(1,1.1) : weight;
            this.directed = directed;
            this.set_label(label);
            this.set_style(style);
        }

        /** Make a copy of this edge.
         *
         * @returns {Edge}
         */
        copy() {
            return new Edge(this.from, this.to, this.weight, this.directed, this.label);
        }

        /** Is this edge identical to the given edge?
         *  From, to, weight directedness and label must be the same.
         *
         * @param {edge} b
         * @returns {boolean}
         */
        eq(b) {
            return this.from == b.from && this.to == b.to && this.directed == b.directed && this.label == b.label && this.weight == b.weight;
        }

        set_label(label) {
            this.label = ((label===undefined ? '' : label)+'').trim();
            return this;
        }

        set_style(style) {
            this.style = style || {};
            return this;
        }
    }
    extension.Edge = Edge;

    class Vertex {
        constructor(x,y,label='') {
            this.x = x;
            this.y = y;
            this.set_label(label);
        }

        /** Make a copy of this vertex.
         *
         *  @returns {Vertex}
         */
        copy() {
            return new Vertex(this.x, this.y, this.label);
        }

        /** Is this vertex identical to the given vertex?
         *  Position and label must be the same.
         *
         * @param {Vertex} b
         * @returns {boolean}
         */
        eq(b) {
            return this.x==b.x && this.y==b.y && this.label==b.label;
        }

        set_label(label) {
            this.label = ((label===undefined ? '' : label)+'').trim();
            return this;
        }
    }
    extension.Vertex = Vertex;

    class Graph {
        constructor(adjacency_matrix, vertices, edges) {
            this.adjacency_matrix = adjacency_matrix;
            this.vertices = vertices;
            this.edges = edges;
        }

        /** Make a copy of this graph.
         *
         * @returns {Graph}
         */
        copy() {
            const g = new Graph(this.adjacency_matrix,this.vertices,this.edges);
            g.loop_positions = this.loop_positions;
            return g;
        }

        get vertices() {
            if(this._vertices===undefined) {
                const vertices = this._vertices = [];
                const m = this.adjacency_matrix;
                for(let i=0;i<m.length;i++) {
                    vertices.push(new Vertex(Math.random(), Math.random()));
                }
            }
            return this._vertices;
        }

        set vertices(v) {
            this._vertices = v;
            if(!this._vertices) {
                return;
            }
            const n = this._vertices.length;
            const d = n - this.adjacency_matrix.length;
            if(d < 0) {
                this.adjacency_matrix = this.adjacency_matrix.slice(0,n).map(row => row.slice(0,n));
            } else if (d > 0) {
                this.adjacency_matrix.forEach(row => {
                    for(let i=0;i<d;i++) {
                        row.push(0);
                    }
                });
                for(let i=0;i<d;i++) {
                    const row = [];
                    for(let i=0;i<n;i++) {
                        row.push(0);
                    }
                    this.adjacency_matrix.push(row);
                }
            }
            this.adjacency_matrix.rows = n;
            this.adjacency_matrix.columns = n;
        }

        /** Is this graph identical to the given graph?
         *  Vertices and edges must be the same.
         *
         * @param {Graph} b
         * @returns {boolean}
         */
        eq(b) {
            if(this.vertices.length != b.vertices.length || this.edges.length != b.edges.length) {
                return false;
            }
            for(let v of this.vertices) {
                if(!b.vertices.find(v2 => v2.eq(v))) {
                    return false;
                }
            }
            for(let e of this.edges) {
                if(!b.edges.find(e2 => e2.eq(e))) {
                    return false;
                }
            }
            return true;
        }

        /** Add a vertex to this graph. Modifies the adjacency matrix.
         *
         *  @param {Vertex} v
         */
        add_vertex(v) {
            const {adjacency_matrix, vertices} = this;
            const row = [];
            adjacency_matrix.forEach(r => {r.push(0); row.push(0);});
            adjacency_matrix.push(row);
            this.vertices.push(v);
            const n = vertices.length;
            this.adjacency_matrix.rows = n;
            this.adjacency_matrix.columns = n;
        }

        /** Add an edge to this graph. Modifies the adjacency matrix.
         *
         *  @param {Edge} e
         */
        add_edge(e) {
            this.edges.push(e);
            this.adjacency_matrix[e.from][e.to] = 1;
            if(!e.directed) {
                this.adjacency_matrix[e.to][e.from] = 1;
            }
        }

        get edges() {
            if(this._edges === undefined) {
                const edges = this._edges = [];
                const m = this.adjacency_matrix;
                for(let i=0;i<m.length;i++) {
                    for(let j=0;j<=i;j++) {
                        if(m[i][j]) {
                            edges.push(new Edge(i, j, Math.abs(m[i][j]), !m[j][i]));
                        } else if(m[j][i]) {
                            edges.push(new Edge(j, i, Math.abs(m[j][i])));
                        }
                    }
                }
            }
            return this._edges;
        }

        set edges(edges) {
            this._edges = edges;
            if(!edges) {
                return;
            }
            const n = this.adjacency_matrix.rows;
            this.adjacency_matrix = this.adjacency_matrix.map(row => row.map(() => 0));
            for(let e of edges) {
                this.adjacency_matrix[e.from][e.to] = 1;
                if(!e.directed) {
                    this.adjacency_matrix[e.to][e.from] = 1;
                }
            }
            this.adjacency_matrix.rows = n;
            this.adjacency_matrix.columns = n;
        }

        /** Get the connected components of this graph.
         *
         * @returns {Array.<number>} - A list of components. Each component is a list giving the indices of the vertices in that component.
         */
        connected_components() {
            const adjacency = this.adjacency_matrix;
            let components = adjacency.map((_,i) => i);
            for(let i=0;i<components.length;i++) {
                for(let j=0;j<components.length;j++) {
                    if(i!=j && adjacency[i][j]) {
                        const keep = Math.min(components[i],components[j]);
                        const remove = Math.max(components[i],components[j]);
                        components = components.map(function(c) { return c==remove ? keep : c; });
                    }
                }
            }
            const dict = {};
            components.forEach((c,i) => {
                if(dict[c]===undefined) {
                    dict[c] = [];
                }
                dict[c].push(i);
            });
            return Object.values(dict);
        }
        /** Is this graph connected?
         *
         * @returns {boolean}
         */
        is_connected() {
            return this.connected_components().length<=1;
        }

        /** Get the subgraph containing the given vertices, and all edges between them.
         *  Omit vertices not in the given list, and all edges with either end on an omitted vertex.
         *
         * @param {Array.<number>} verts - The indices of the vertices in the subgraph.
         * @returns {Graph}
         */
        subgraph(verts) {
            const m = verts.map(a => {
                return verts.map(b => {
                    return this.adjacency_matrix[a][b];
                })
            });
            m.rows = m.columns = verts.length;
            let vertices, edges;
            if(this.vertices) {
                vertices = verts.map(i => this.vertices[i]);
            }
            if(this.edges) {
                edges = this.edges.filter(e=>verts.indexOf(e.from)>=0 && verts.indexOf(e.to)>=0).map(e => {
                    const e2 = e.copy();
                    e2.from = verts.indexOf(e.from);
                    e2.to = verts.indexOf(e.to);
                    return e2;
                });
            }
            const g = new Graph(m, vertices, edges);
            const loop_positions = {};
            if(this.loop_positions) {
                verts.forEach((vi,i) => {
                    loop_positions[i] = this.loop_positions[vi];
                });
            }
            g.loop_positions = loop_positions;
            return g;
        }

        /** Get the subgraph containing only the given edges, and the vertices they connect.
         *
         * @param {Array.<Edge>}
         * @returns {Graph}
         */
        subgraph_by_edges(edges) {
            const vertset = new Set([]);
            for(let e of edges) {
                vertset.add(e.from);
                vertset.add(e.to);
            }
            const verts = Array.from(vertset);
            const g = this.subgraph(verts);
            g.edges = edges.map(e => {
                const e2 = e.copy();
                e2.from = verts.indexOf(e.from);
                e2.to = verts.indexOf(e.to);
                return e2;
            });
            return g;
        }

        /** Get the largest connected component of the given graph.
         *
         * @returns {Graph}
         */
        largest_connected_component() {
            const components = this.connected_components();
            let biggest = [];
            for(let c of components) {
                if(c.length>biggest.length) {
                    biggest = c;
                }
            }
            return this.subgraph(biggest);
        }

        /** Get an adjacency matrix corresponding to a graph with the given edges.
         *
         * @param {Array.Edge} edges
         * @returns {Graph}
         */
        static from_edges(edges) {
            let size = 0;
            for(let e of edges) {
                size = Math.max(e.from+1,Math.max(e.to+1,size));
            }
            const m = [];
            for(let i=0;i<size;i++) {
                const row = [];
                for(let j=0;j<size;j++) {
                    row.push(0);
                }
                m.push(row);
            }
            edges.forEach(function(e) {
                const {from, to} = e;
                m[from][to] = 1;
                if(!e.directed) {
                    m[to][from] = 1;
                }
            });
            m.rows = m.columns = size;
            return new Graph(m, undefined, edges);
        }

        /** Make an SVG drawing of this graph.
         *
         * @returns {SVG}
         */
        draw() {
            const draw = SVG();
            draw.addClass('graph');

            /** Draw an arrow between a and b
             */
            function arrow(a,b) {
                let dx = b.x-a.x;
                let dy = b.y-a.y;
                const d = Math.sqrt(dx*dx+dy*dy);
                const l = 0.5*scale;
                const w = 0.4*scale;
                let [nx,ny] = [-dy,dx];
                dx *= l/d;
                dy *= l/d;
                nx *= w/d;
                ny *= w/d;
                const [cx,cy] = [(a.x+b.x)/2, (a.y+b.y)/2];
                return draw.polygon([[cx+dx,cy+dy],[cx-dx+nx,cy-dy+ny],[cx-dx/2,cy-dy/2],[cx-dx-nx,cy-dy-ny]]);
            }

            const {vertices, edges, adjacency_matrix} = this;

            let minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;

            vertices.forEach((n,i) => {
                minx = Math.min(minx,n.x);
                miny = Math.min(miny,n.y);
                maxx = Math.max(maxx,n.x);
                maxy = Math.max(maxy,n.y);
            });

            const margin = 4;
            const scale = 1;

            let extra = 0;
            for(let e of edges) {
                const a = vertices[e.from];
                const b = vertices[e.to];
                let curve;
                if(e.from == e.to) {
                    const c = this.loop_positions[e.from] || {x: a.x+1, y:a.y};
                    extra += 1;
                    const dx = c.x-a.x;
                    const dy = c.y-a.y;
                    const d = Math.sqrt(dx*dx+dy*dy);
                    const r = 2*scale;
                    curve = draw.circle(r).center(a.x+dx/d*r/2,a.y+dy/d*r/2);
                } else {
                    curve = draw.line(a.x, a.y, b.x, b.y);
                }
                const width = (e.style.width===undefined ? 1 : e.style.width) * 0.1 * scale;
                curve.fill('none').stroke({width: 3*width,color:'white',opacity:0.8}).attr({role:'img'});
                const top = curve.clone();
                top.addTo(draw);
                top.fill('none').stroke({width: width,color:'black',opacity:1})
                if(e.directed) {
                    arrow(a,b);
                }
                if(a.label && b.label) {
                    let label;
                    if(e.directed) {
                        label = `Edge from vertex ${a.label} to vertex ${b.label}`;
                    } else {
                        label = `Edge between vertices ${a.label} and ${a.label}`;
                    }
                    top.attr({'aria-label': label});
                }
                if(e.label) {
                    const [l,r] = b.x > a.x ? [a,b] : [b,a];
                    const dx = r.x - l.x;
                    const dy = r.y - l.y;
                    const d = Math.sqrt(dx*dx+dy*dy);
                    const [nx,ny] = [-dy/d, dx/d];
                    const ldist = 0.5;
                    const [lx, ly] = [l.x + dx/2 + nx*ldist, l.y + dy/2 + ny*ldist];
                    const text = draw.text(e.label).font({size:1*scale}).center(lx,ly).rotate(Math.atan2(dy,dx)*180/Math.PI);
                    if(e.style.opacity!==undefined) {
                        text.fill({opacity: e.style.opacity});
                    }
                }
                if(e.style.dash!==undefined) {
                    const pattern = e.style.dash===true ? '0.5 0.5' : e.style.dash;
                    top.stroke({'dasharray': pattern});
                }
                if(e.style.opacity!==undefined) {
                    top.stroke({opacity: e.style.opacity});
                }
            }
            const real_vertices = vertices.slice(0,adjacency_matrix.length);

            real_vertices.forEach((n,i) => {
                const c = draw.circle(1*scale).center(n.x,n.y).attr({role:'img'});
                if(vertices[i].label) {
                    c.attr({'aria-label':'Vertex labelled '+vertices[i].label});
                }
            })

            real_vertices.forEach((n,i) => {
                if(!n.label) {
                    return;
                }
                let nx = 0;
                let ny = 0;
                adjacency_matrix[i].forEach(function(a,j) {
                    if(i!=j && a) {
                        const n2 = vertices[j];
                        const dx = n2.x-n.x;
                        const dy = n2.y-n.y;
                        const d = dx*dx+dy*dy;
                        nx += dx/d;
                        ny += dy/d;
                    }
                });
                if(nx==0 && ny==0) {
                    nx = 1;
                    ny = 1;
                }
                const nd = Math.sqrt(nx*nx+ny*ny);
                const r = 1.5;
                const [cx,cy] = [n.x-r*nx/nd,n.y-r*ny/nd];
                const t = draw.text(n.label).font({size:1*scale,anchor:'top'}).center(cx,cy);
                const b = t.bbox();
                const pad = 0;
                t.before(draw.line(cx,cy,n.x,n.y).stroke({width:0.05*scale,color:'gray'}));
                t.before(draw.ellipse(b.w+2*pad,b.h+2*pad).move(b.x-pad,b.y-pad).fill('white'))
            });

            draw.viewbox(minx-margin,miny-margin,maxx-minx+2*margin,maxy-miny+2*margin)

            return draw.node;
        }


        /** Lay out the graph as nicely as possible, so that vertices are spaced apart and edges try not to cross.
         *  It still makes edges cross unnecessarily sometimes.
         *
         */
        auto_layout() {
            const w = 2;
            const vertices = this.vertices.map(v => { return {x: v.x, y: v.y, width: w, height: w} });
            const edges = this.edges.map(e => { return { source: e.from, target: e.to, weight: e.weight} });
            const m = this.adjacency_matrix;
            const loops = [];
            for(let i=0;i<m.length;i++) {
                if(m[i][i]) {
                    vertices.push({x:Math.random(),y:Math.random(), width: 0.2, height: 0.2});
                    edges.push({source:i,target:vertices.length-1,weight:0.1})
                    loops.push(i);
                }
            }
            const adaptor = cola.adaptor({})
                .avoidOverlaps(true)
                .linkDistance(5)
            //    .jaccardLinkLengths(5)
            ;
            adaptor.nodes(vertices);

            adaptor.links(edges)

            adaptor.start();

            // spend at most 100ms laying out the graph
            const t1 = new Date();
            while(!adaptor.tick() && (new Date())-t1<100) {
            }

            const n = this.vertices.length;
            const nodes = adaptor.nodes();
            const positions = nodes.slice(0,n);
            const loop_positions = {};
            loops.forEach((vn,i) => {
                loop_positions[vn] = nodes[n+i];
            });

            this.set_vertex_positions(positions, loop_positions);
        }

        /** Lay out this graph as bipartite, with the vertices arranged in two vertical rows.
         * 
         * @param {Array.<boolean>} left - For each vertex, whether it is on the left-hand side or not.
         */
        bipartite_layout(left) {
            const num_vertices = this.vertices.length;
            const numleft = left.filter(x=>x).length;
            const numright = num_vertices - numleft;
            const yspace = 5;
            const xspace = 5;
            let ly = 0;
            let ry = (numleft-numright)*yspace/2;
            const positions = [];
            for(let i=0;i<num_vertices;i++) {
                if(left[i]) {
                    positions.push({x: 0, y: ly});
                    ly += yspace;
                } else {
                    positions.push({x: xspace, y: ry});
                    ry += yspace;
                }
            }
            this.set_vertex_positions(positions);
        }

        /** Set positions for the vertices in this graph.
         *  
         *  @param {Array.<Object>} positions - Objects with properties `x` and `y`.
         *  @param {Array.<Object>} loop_positions - Objects with properties `x` and `y`, for positioning the virtual vertices made for drawing loops.
         *  @returns {Graph} - this
         */
        set_vertex_positions(positions, loop_positions) {
            this.vertices.forEach((v,i) => { v.x = positions[i].x; v.y = positions[i].y; });
            this.loop_positions = loop_positions || {};
            return this;
        }

        /** Set labels for vertices in this graph.
         *
         * @param {Array.<string>} labels
         * @returns {Graph} - this
         */
        set_vertex_labels(labels) {
            this.vertices.forEach((v,i) => v.set_label(labels[i]));
            return this;
        }

        /** Set the weights of the edges in this graph.
         *
         *  @param {Array.<number>} weights
         *  @returns {Graph} - this
         */
        set_edge_weights(weights) {
            this.edges.forEach((e,i) => e.weight = weights[i]);
            return this;
        }

        /** Set the labels of the edges in this graph.
         * 
         *  @param {Array.<string>} labels
         *  @returns {Graph} - this
         */
        set_edge_labels(labels) {
            this.edges.forEach((e,i) => e.set_label(labels[i]));
            return this;
        }

        /** Set the styles of the edges in this graph.
         *
         *  @param <Array.<Object>} styles
         *  @returns {Graph} - this
         */
        set_edge_styles(styles) {
            this.edges.forEach((e,i) => e.set_style(styles[i]));
            return this;
        }

        /** Get the degree of each of the vertices in this graph.
         *
         * @returns {Array.<number>}
         */
        vertex_degrees() {
            const adjacency = this.adjacency_matrix;
            const degrees = [];
            for(let i=0;i<adjacency.rows;i++) {
                let d = 0;
                for(let j=0;j<adjacency.columns;j++) {
                    d += adjacency[i][j] != 0 ? 1 : 0;
                }
                degrees.push(d);
            }
            return degrees;
        }


        /** Make the union of several graphs.
         *
         * @param {...Array.<Graph>} arguments
         * @returns {Graph}
         */
        static union(g) {
            let {vertices, edges, adjacency_matrix} = g;
            for(let i=1;i<arguments.length;i++) {
                const b = arguments[i];
                const n = [];
                n.rows = adjacency_matrix.rows + b.adjacency_matrix.rows;
                n.columns = adjacency_matrix.columns + b.adjacency_matrix.columns;
                for(let y=0;y<n.rows;y++) {
                    const row = [];
                    n.push(row);
                    for(let x=0;x<n.columns;x++) {
                        let a = 0;
                        if(x<adjacency_matrix.columns && y<adjacency_matrix.rows) {
                            a = adjacency_matrix[y][x];
                        } else if(x>=adjacency_matrix.columns && y>=adjacency_matrix.rows) {
                            a = b.adjacency_matrix[y-adjacency_matrix.rows][x-adjacency_matrix.columns];
                        }
                        row.push(a);
                    }
                }
                adjacency_matrix = n;
                const osize = vertices.length;
                vertices = vertices.concat(b.vertices.map(v=>{
                    v = v.copy();
                    v.x += 1;
                    return v;
                }));
                edges = edges.concat(b.edges.map(e => {
                    const e2 = e.copy();
                    e2.from = e.from + osize;
                    e2.to = e.to + osize;
                    return e2;
                }));
            }
            return new Graph(adjacency_matrix, vertices, edges);
        }

        /** Make the Cartesian product of several graphs. 
         *  The Cartesian product of two graphs A and B has:
         *    * a vertex for each pair (a,b) of vertices from A and B.
         *    * an edge between (a1,b1) and (a2,b2) iff a1==a2 and b1 is adjacent to b2 in B, or b1==b2 and a1 is adjacent to a2 in A.
         *
         *  Vertex and edge labels are lost until I have time to work out how to make them match up!
         *
         *  @param {...Array.<Graph>} arguments
         *  @returns {Graph}
         */
        static cartesian_product(g) {
            let {vertices, edges, adjacency_matrix} = g;
            for(let i=1;i<arguments.length;i++) {
                const b = arguments[i];
                const n = [];
                const sm = adjacency_matrix.rows;
                const size = adjacency_matrix.rows*b.adjacency_matrix.rows;
                n.rows = n.columns = size;
                for(let y=0;y<size;y++) {
                    const row = [];
                    n.push(row);
                    const yk = (y-(y%sm))/sm;
                    for(let x=0;x<size;x++) {
                        const xk = (x-(x%sm))/sm;
                        let a = b.adjacency_matrix[yk][xk] && (x%sm)==(y%sm) ? 1 : 0;
                        if(xk==yk) {
                            a = adjacency_matrix[y-yk*sm][x-xk*sm];
                        }
                        row.push(a);
                    }
                }
                adjacency_matrix = n;
            }
            return new Graph(adjacency_matrix);
        }

        /** Make the direct product of several graphs.
         *  The direct product of two graphs A and B has:
         *    * a vertex for each pair (a,b) of vertices from A and B.
         *    * an edge between (a1,b1) and (a2,b2) iff there is an edge between a1 and a2 in A, and an edge between b1 and b2 in B.
         *
         *  @param {...Array.<adjacency_matrix>} arguments
         *  @returns {adjacency_matrix}
         */
        static direct_product(g) {
            let {vertices, edges, adjacency_matrix} = g;
            for(let i=1;i<arguments.length;i++) {
                const b = arguments[i];
                const n = [];
                const sm = adjacency_matrix.rows;
                const size = adjacency_matrix.rows*b.adjacency_matrix.rows;
                n.rows = n.columns = size;
                for(let y=0;y<size;y++) {
                    const row = [];
                    n.push(row);
                    const yk = (y-(y%sm))/sm;
                    for(let x=0;x<size;x++) {
                        const xk = (x-(x%sm))/sm;
                        let a = b.adjacency_matrix[yk][xk] && adjacency_matrix[y%sm][x%sm] ? 1 : 0;
                        row.push(a);
                    }
                }
                adjacency_matrix = n;
            }
            return new Graph(adjacency_matrix);
        }


        /** Permute the graph's vertices.
         *
         * @param {permutation} p - For each vertex in the graph, its index in the permuted graph.
         * @returns {Graph}
         */
        permute_vertices(p) {
            const adjacency_matrix = this.adjacency_matrix.map((row,y) => { return row.map((c,x) => { return this.adjacency_matrix[p[y]][p[x]]; }) });
            adjacency_matrix.rows = this.adjacency_matrix.rows;
            adjacency_matrix.columns = this.adjacency_matrix.columns;
            const vertices = p.map(x => this.vertices[x]);
            const edges = this.edges.map(e => {
                const e2 = e.copy();
                e2.from = p[e.from];
                e2.to = p[e.to];
                return e2;
            });
            return new Graph(adjacency_matrix, vertices, edges);
        }

        /** Is the given permutation an isomorphism of this graph?
         *  True if there is an edge `(p(a),p(b))` iff there is an edge `(a,b)`.
         * 
         *  @param {permutation} p
         *  @returns {boolean}
         */
        is_isomorphism(p) {
            const m = this.adjacency_matrix;
            if(p.length != m.rows) { 
                throw(new Error("Error testing if a permutation is a graph isomorphism: the permutation must have the same size as the graph."));
            }
            const pm = this.permute_vertices(p).adjacency_matrix;
            for(let y=0;y<m.rows;m++) {
                for(let x=0;x<m.columns;x++) {
                    if(m[y][x] - pm[y][x]!=0) {
                        return false;
                    }
                }
            }
            return true;
        }

        /** A matrix showing the weights of edges between vertices, based on the edges.
         *
         *  @returns {Array.<Array.<number>>}
         */
        weight_matrix() {
            const matrix = this.adjacency_matrix.map(row=>row.map(()=>null));
            for(let e of this.edges) {
                matrix[e.from][e.to] = e.weight;
                if(!e.directed) {
                    matrix[e.to][e.from] = e.weight;
                }
            }
            matrix.rows = this.adjacency_matrix.rows;
            matrix.columns = this.adjacency_matrix.columns;
            return matrix;
        }

        /** An HTML table showing the weights of the edges between vertices in this graph.
         *
         * @returns {Element}
         */
        weight_table() {
            const {vertices, edges} = this;
            const table = document.createElement('table');
            table.classList.add('weight-matrix');
            const header_row = document.createElement('tr');
            header_row.appendChild(document.createElement('th'));
            table.appendChild(header_row);
            this.vertices.forEach(v => {
                const th = document.createElement('th');
                th.textContent = v.label;
                header_row.appendChild(th);
            });
            this.weight_matrix().forEach((row,i) => {
                const tr = document.createElement('tr');
                table.appendChild(tr);
                const th = document.createElement('th');
                th.textContent = vertices[i].label;
                tr.appendChild(th);
                row.forEach((x,i) => {
                    const td = document.createElement('td');
                    td.textContent = x===null ? '' : x;
                    tr.appendChild(td);
                });
            });
            return table;
        }

        /** Find a minimum spanning forest of a weighted graph, using Kruskal's algorithm.
         *
         * @returns {Object.<Array.<Edge>,WorkingOut>} - The edges included in the minimum spanning forest.
         */
        annotated_kruskals_algorithm() {
            let {edges, vertices} = this;
            edges = edges.slice();
            edges.sort(Numbas.util.sortBy('weight'));
            const n = this.vertices.length;
            let forest = [];
            const out = [];

            const working = new WorkingOut(
                4,
                data => {
                    return {
                        remaining_edges: edges.filter(e => forest[e.from] != forest[e.to]),
                        included_edges: out.slice(),
                        forest: Numbas.util.copyobj(forest)
                    }
                },
                (container,step) => {
                    const explanation = document.createElement('p');
                    explanation.classList.add('explanation');
                    explanation.innerHTML = step.explanation || '';
                    container.appendChild(explanation);

                    const g = this.copy();
                    const forest_list = document.createElement('ul');
                    for(let c of new Set(Object.values(step.forest))) {
                        const li = document.createElement('li');
                        const vs = [];
                        for(let [i,j] of Object.entries(step.forest)) {
                            if(j==c) {
                                vs.push(vertices[i]);
                            }
                        }
                        li.textContent = vs.map(v => v.label).join(', ');
                        forest_list.appendChild(li);
                    }
                    const edge_table = document.createElement('table');
                    step.remaining_edges.forEach(e => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `<td>${vertices[e.from].label}</td><td>${vertices[e.to].label}</td><td>${e.weight}</td>`;
                        edge_table.appendChild(tr);
                    });
                    g.edges = this.edges.map(e => {
                        const e2 = e.copy();
                        if(step.included_edges.contains(e)) {
                            e2.set_style({width:2});
                        } else if(step.remaining_edges.contains(e)) {
                            e2.set_style({opacity:0.5, dash:true});
                        } else {
                            e2.set_style({opacity:0.1});
                        }
                        return e2;
                    }).filter(e=>e);

                    if(!step.no_graph) {
                        container.appendChild(g.draw());
                    }

                    container.appendChild(edge_table);

                    if(!step.no_forest) {
                        container.appendChild(forest_list);
                    }
                }
            );

            working.add_step({
                explanation: 'Sort the edges by weight.',
                no_forest: true
            });

            for(let i=0;i<n;i++) {
                forest.push(i);
            }

            working.add_step({
                explanation: 'Initially, each vertex is in its own component.'
            });

            for(let e of edges) {
                if(forest[e.from]!=forest[e.to]) {
                    out.push(e);
                    working.add_step({
                        explanation: `Find the edge with the lowest weight. This is the edge from ${vertices[e.from].label} to ${vertices[e.to].label}. Connect the two trees containing ${vertices[e.from].label} and ${vertices[e.to].label}.`
                    });
                    const [from,to] = [forest[e.from], forest[e.to]];
                    const removing_edges = [];
                    for(let e2 of edges) {
                        if(e2 != e && ((forest[e2.from]==from && forest[e2.to]==to) || (forest[e2.to]==from && forest[e2.from]==to))) {
                            removing_edges.push(e2);
                        }
                    }
                    forest = forest.map(i => i==from ? to : i);
                    if(removing_edges.length) {
                        working.add_step({
                            explanation: `Remove any other edges joining those two trees.`,
                            removing_edges: removing_edges
                        });
                    }
                }
            }

            working.add_step({
                explanation: "All edges have been considered, so the algorithm stops.",
                no_forest: true,
                no_graph: true
            });
            return {edges: out, working: working};
        }

        /** Find a minimum spanning forest of a weighted graph, using Kruskal's algorithm.
         *
         * @returns {Array.<Edge>} - The edges included in the minimum spanning forest.
         */
        kruskals_algorithm() {
            return this.annotated_kruskals_algorithm().edges;
        }

        /** Find a minimum spanning tree of a weighted graph, using Prim's algorithm.
         *  The graph must be connected.
         *
         *  @returns {Object.<Array.<Edge>,WorkingOut>} - The edges included in the minimum spanning tree.
         */
        annotated_prims_algorithm() {
            let {edges, vertices} = this;
            edges = edges.slice();
            edges.sort(Numbas.util.sortBy('weight'));
            const n = this.vertices.length;
            const out = [];
            const included = {};
            const working = new WorkingOut(
                3,
                data => {
                    return {
                        included_edges: out.slice(),
                        included_vertices: Numbas.util.copyobj(included),
                        n: n,
                    }
                },
                (container,step) => {
                    if(step.explanation) {
                        const explanation = document.createElement('p');
                        explanation.classList.add('explanation');
                        explanation.innerHTML = step.explanation;
                        container.appendChild(explanation);
                    }
                    if(!step.no_graph) {
                        const g = this.copy();
                        const weight_table = this.weight_table();
                        for(let i=0;i<n;i++) {
                            if(step.included_vertices[i]) {
                                const ths = [
                                    weight_table.querySelector('tr').querySelectorAll('th')[i+1],
                                    weight_table.querySelectorAll('tr')[i+1].querySelector('th')
                                ]
                                ths.forEach(th => th.classList.add('visited'));
                            }
                        }
                        g.edges = this.edges.map(e => {
                            const tds = [weight_table.querySelectorAll('tr')[e.from+1].querySelectorAll('td')[e.to]];
                            if(!e.directed) {
                                tds.push(weight_table.querySelectorAll('tr')[e.to+1].querySelectorAll('td')[e.from]);
                            }
                            const e2 = e.copy();
                            if(step.included_edges.contains(e)) {
                                e2.set_style({width:2});
                                tds.forEach(td => td.classList.add('visited'));
                            } else if(step.possible_edges && step.possible_edges.contains(e)) {
                                e2.set_style({opacity:0.5, dash:true});
                                tds.forEach(td => td.classList.add('possible'));
                            } else {
                                e2.set_style({opacity:0.1});
                                tds.forEach(td => td.classList.add('impossible'));
                                if(step.possible_edges && (step.included_edges[e.from] || step.included_edges[e.to])) {
                                    tds.forEach(td => td.classList.add('connected'));
                                }
                            }
                            return e2;
                        }).filter(e=>e);
                        container.appendChild(g.draw());

                        container.appendChild(weight_table);
                    }
                }
            );
            working.add_step({
                explanation: 'Start with just the vertices of the graph.'
            });
            working.add_step({
                explanation: `Start at any vertex. We pick ${vertices[0].label}.`,
                no_graph: true
            });
            included[0] = true;

            while(edges.length) {
                const possible = edges.filter(e => included[e.from] || included[e.to]);
                if(!possible.length) {
                    throw(new Error("Prim's algorithm requires a connected graph."));
                }
                working.add_step({
                    explanation: 'Consider the edges connecting points not yet included to points already included.',
                    possible_edges: possible
                });
                const e = possible[0];
                out.push(e);
                working.add_step({
                    explanation: `Add the lowest-weight edge to the graph: the edge connecting ${vertices[e.from].label} and ${vertices[e.to].label}.`
                });

                included[e.from] = true;
                included[e.to] = true;
                edges = edges.filter(e => !(included[e.from] && included[e.to]));
            }
            working.add_step({
                explanation: 'Every vertex is now connected, so the minimum spanning tree is complete.',
                no_graph: true
            });
            return {edges: out, working: working};
        }

        /** Find a minimum spanning tree of a weighted graph, using Prim's algorithm.
         *  The graph must be connected.
         *
         *  @returns {Array.<Edge>} - The edges included in the minimum spanning tree.
         */
        prims_algorithm() {
            const {edges} = this.annotated_prims_algorithm();
            return edges;
        }

        /** Is this graph a tree (or more precisely, a forest of (directed) acyclic graphs)? 
         *  True if there are no cycles.
         *
         * @returns {boolean}
         */
        is_tree() {
            /** Visit vertex `i`, coming from vertex `from`.
             */
            const g = this;
            const n = this.vertices.length;
            const ever_visited = new Set([]);
            function visit(i,visited) {
                ever_visited.add(i);
                if(visited.contains(i)) {
                    return false;
                }
                visited = visited.slice();
                visited.splice(0,0,i);
                for(let j=0;j<n;j++) {
                    if(j==visited[1]) {
                        continue;
                    }
                    if(g.adjacency_matrix[i][j]) {
                        if(!visit(j,visited)) {
                            return false;
                        }
                    }
                }
                return true;
            }
            for(let i=0;i<n;i++) {
                if(!ever_visited.has(i)) {
                    if(!visit(i,[])) {
                        return false;
                    }
                }
            }
            return true;
        }
    }
    extension.Graph = Graph;

    /** Do the given line segments intersect?
     * 
     * @param {segment} s1
     * @param {segment} s2
     * @returns {boolean}
     */
    function segments_intersect(s1,s2) {
        const [x1,y1] = [s1.from.x, s1.from.y];
        const [x2,y2] = [s1.to.x, s1.to.y];
        const [x3,y3] = [s2.from.x, s2.from.y];
        const [x4,y4] = [s2.to.x, s2.to.y];
        const [dx1, dy1] = [x2-x1, y2-y1];
        const [dx2,dy2] = [x4-x3,y4-y3];
        const [dx3,dy3] = [x3-x1,y3-y1];
        const a = (dx3*dy2 - dy3*dx2)/(dx1*dy2 - dy1*dx2);
        const b = -(dx3*dy1 - dy3*dx1)/(dx2*dy1 - dx1*dy2);
        const wiggle = 0.0001;
        const min = wiggle;
        const max = 1-wiggle;
        return b>min && b<max && a>0 && a<max;
    }

    /** Create a random planar graph.
     *  The graph is created by placing points at random in the unit square, then walking through the list of all possible edges in random order, rejecting edges that intersect previously-visited edges.
     *  You can give probabilities for keeping intersecting or non-intersecting edges, which can produce non-planar or non-connected edges.
     *
     * @param {number} size - The number of vertices in the graph.
     * @param {number} p_keep_noncrossing - The probability of including an edge that does not intersect any previously-visited edges.
     * @param {number} p_keep_crossing - The probability of including an edge that intersects a previously-visited edge.
     * @returns {graph}
     */
    const random_planar_graph = extension.random_planar_graph = function(size,p_keep_noncrossing,p_keep_crossing) {
        p_keep_noncrossing = p_keep_noncrossing===undefined ? 1 : p_keep_noncrossing;
        p_keep_crossing = p_keep_crossing===undefined ? 0 : p_keep_crossing;
        const vertices = [];
        for(let i=0;i<size;i++) {
            vertices.push(new Vertex(Math.random(), Math.random()));
        }
        let edges = [];
        for(let i=0;i<size;i++) {
            for(let j=i+1;j<size;j++) {
                edges.push(new Edge(i,j));
            }
        }
        edges = Numbas.math.shuffle(edges);

        const out_edges = [];
        for(let e of edges) {
            const crossing = out_edges.some(e2=>segments_intersect({from:vertices[e.from],to:vertices[e.to]},{from:vertices[e2.from],to:vertices[e2.to]}));
            const keep = Math.random() < (crossing ? p_keep_crossing : p_keep_noncrossing);
            if(keep) {
                out_edges.push(e);
            }
        }
        const g = Graph.from_edges(out_edges);
        g.vertices = vertices;
        return g;
    }


    /** To cover:
     *
     * Folding graphs
     */

    var types = jme.types;
    var TMatrix = types.TMatrix;
    var THTML = types.THTML;
    var TList = types.TList;
    var TVector = types.TVector;
    var TInt = types.TInt;
    var TNum = types.TNum;
    var TString = types.TString;
    var TDict = types.TDict;
    var TBool = types.TBool;

    var TVertex = extension.TVertex = function(v) {
        this.value = v;
    }
    jme.registerType(
        TVertex,
        'vertex',
        {
            'vector': function(v) {
                return new TVector([v.value.x, v.value.y]);
            }
        }
    );
    jme.display.registerType(TVertex, {
        tex: function(thing, tok, texArgs, settings) {
            return tok.value.label || '\\textrm{Vertex}';
        },
        jme: function(tree,tok,bits,settings) {
            const v = tok.value;
            return 'vertex('+this.niceNumber(v.x)+', '+this.niceNumber(v.y)+', '+this.typeToJME['string'].call(this,null,{value:v.label},[])+')';
        },
        displayString: function(tok) {
            return tok.value.label || 'Vertex';
        }
    });
    Numbas.util.equalityTests['vertex'] = function(a,b) {
        return a.value.eq(b.value);
    };

    var TEdge = extension.TEdge = function(e) {
        this.value = e;
    }
    jme.registerType(TEdge,'edge');
    jme.display.registerType(TEdge, {
        tex: function(thing, tok, texArgs, settings) {
            return tok.value.label || '('+e.from+', '+e.to+')';
        },
        jme: function(tree,tok,bits,settings) {
            const e = tok.value;
            return 'edge('+e.from+', '+e.to+', '+this.niceNumber(e.weight)+', '+(e.directed ? 'true' : 'false')+', '+this.typeToJME['string'].call(this,null,{value:e.label},[])+')';
        },
        displayString: function(tok) {
            const e = tok.value;
            return '('+e.from+', '+e.to+')';
        }
    });

    var TGraph = extension.TGraph = function(g) {
        this.value = g;
    }
    jme.registerType(TGraph,'graph');
    jme.display.registerType(TGraph, {
        tex: function(thing, tok, texArgs, settings) {
            return '\\textrm{graph}';
        },
        jme: function(tree,tok,bits,settings) {
            const g = tok.value;
            const adjacency_matrix = jme.wrapValue(g.adjacency_matrix);
            const vertices = new TList(g.vertices.map(v=>new TVertex(v)));
            const edges = new TList(g.edges.map(e=>new TEdge(e)));
            return this.render({tok: new types.TFunc('graph'), args: [{tok: adjacency_matrix}, {tok: vertices}, {tok: edges}]});
        },
        displayString: function(tok) {
            return 'graph';
        }
    });
    Numbas.util.equalityTests['graph'] = function(a,b) {
        return a.value.eq(b.value);
    };

    scope.addFunction(new jme.funcObj('edge', ['number','number','[number]','[boolean]','[string]','[dict]'], TEdge, function(from,to,weight,directed,label,style) {
        return new Edge(from,to,weight,directed,label,style);
    }));

    scope.addFunction(new jme.funcObj('from', ['edge'], TInt, function(e) {
        return e.from;
    }));

    scope.addFunction(new jme.funcObj('to', ['edge'], TInt, function(e) {
        return e.to;
    }));

    scope.addFunction(new jme.funcObj('weight', ['edge'], TNum, function(e) {
        return e.weight;
    }));

    scope.addFunction(new jme.funcObj('directed', ['edge'], TBool, function(e) {
        return e.directed;
    }));

    scope.addFunction(new jme.funcObj('label', ['edge'], TString, function(e) {
        return e.label;
    }));

    scope.addFunction(new jme.funcObj('ends', ['edge'], TList, function(e) {
        return [e.from, e.to];
    },{unwrapValues: true}));

    scope.addFunction(new jme.funcObj('vertex', ['number','number','[string]'], TVertex, function(x,y,label) {
        return new Vertex(x,y,label);
    }));

    scope.addFunction(new jme.funcObj('vertex', ['vector','[string]'], TVertex, function(pos,label) {
        return new Vertex(pos[0],pos[1],label);
    }));

    scope.addFunction(new jme.funcObj('label', ['vertex'], TString, function(v) {
        return v.label;
    }));

    scope.addFunction(new jme.funcObj('graph', ['matrix','[list of vertex]', '[list of edge]'], TGraph, function(adjacency_matrix, vertices, edges) {
        const g = new Graph(adjacency_matrix,vertices,edges);
        if(vertices===undefined) {
            g.auto_layout();
        }
        return new TGraph(g);
    },{unwrapValues: true}));

    scope.addFunction(new jme.funcObj('graph',['list of edge'], TGraph, function(edges) {
        const g = Graph.from_edges(edges);
        g.auto_layout();
        return new TGraph(g);
    },{unwrapValues: true}));

    scope.addFunction(new jme.funcObj('graph',['list of vertex','[list of edge]'], TGraph, function(vertices, edges) {
        const g = Graph.from_edges(edges || []);
        g.vertices = vertices;
        return new TGraph(g);
    },{unwrapValues: true}));

    scope.addFunction(new jme.funcObj('adjacency_matrix',['graph'],TMatrix,function(g) {
        return g.adjacency_matrix;
    }));

    scope.addFunction(new jme.funcObj('vertices',['graph'],TList,function(g) {
        return g.vertices.map(v=>new TVertex(v));
    }));

    scope.addFunction(new jme.funcObj('edges',['graph'],TList,function(g) {
        return g.edges.map(v=>new TEdge(v));
    }));

    scope.addFunction(new jme.funcObj('set_vertex_positions',['graph','list of vector'],TGraph,function(g,positions) {
        g = g.copy();
        return new TGraph(g.set_vertex_positions(positions.map(([x,y])=>{ return {x,y} })));
    },{unwrapValues: true}));

    scope.addFunction(new jme.funcObj('set_vertex_labels',['graph','list of string'],TGraph,function(g,labels) {
        g = g.copy();
        return new TGraph(g.set_vertex_labels(labels));
    },{unwrapValues: true}));

    scope.addFunction(new jme.funcObj('set_edge_weights', ['graph','list of number'], TGraph, function(g,weights) {
        g = g.copy();
        return new TGraph(g.set_edge_weights(weights));
    }, {unwrapValues: true}));

    scope.addFunction(new jme.funcObj('set_edge_labels',['graph','list of string'],TGraph,function(g,labels) {
        g = g.copy();
        return new TGraph(g.set_edge_labels(labels));
    },{unwrapValues: true}));

    scope.addFunction(new jme.funcObj('set_edge_styles',['graph','list of dict'],TGraph,function(g,styles) {
        g = g.copy();
        return new TGraph(g.set_edge_styles(styles));
    },{unwrapValues: true}));

    scope.addFunction(new jme.funcObj('draw',['graph'],THTML,function(g) {
        return g.draw();
    }));

    scope.addFunction(new jme.funcObj('auto_layout',['graph'],TGraph,function(g) {
        g = g.copy();
        g.auto_layout();
        return g;
    }));

    scope.addFunction(new jme.funcObj('bipartite_layout',['graph','list of boolean'],TList,function(g,left) {
        g = g.copy();
        g.bipartite_layout(left);
        return new TGraph(g);
    },{unwrapValues: true}));

    scope.addFunction(new jme.funcObj('vertex_degrees',['graph'],TList,function(g) {
        return g.vertex_degrees();
    },{unwrapValues: true}));

    scope.addFunction(new jme.funcObj('+',['graph','graph'],TGraph,function(a,b) {
        return Graph.union(a,b);
    }));

    scope.addFunction(new jme.funcObj('+',['graph','vertex'],TGraph,function(g,v) {
        g = g.copy();
        g.add_vertex(v);
        return g;
    }));

    scope.addFunction(new jme.funcObj('+',['graph','list of vertex'],TGraph,function(g,vertices) {
        g = g.copy();
        for(let v of vertices) {
            g.add_vertex(v);
        }
        return new TGraph(g);
    },{unwrapValues: true}));

    scope.addFunction(new jme.funcObj('+',['graph','edge'],TGraph,function(g,e) {
        g = g.copy();
        g.add_edge(e);
        return g;
    }));

    scope.addFunction(new jme.funcObj('+',['graph','list of edge'],TGraph,function(g,edges) {
        g = g.copy();
        for(let e of edges) {
            g.add_edge(e);
        }            
        return new TGraph(g);
    },{unwrapValues: true}));

    scope.addFunction(new jme.funcObj('connected_components',['graph'],TList, function(g) {
        return g.connected_components();
    }, {unwrapValues: true}));

    scope.addFunction(new jme.funcObj('is_connected',['graph'],TBool, function(g) {
        return g.is_connected();
    }));

    scope.addFunction(new jme.funcObj('largest_connected_component',['graph'],TList, function(g) {
        return g.largest_connected_component();
    }, {unwrapValues: true}));

    scope.addFunction(new jme.funcObj('subgraph',['graph','list of number'],TGraph, function(g,verts) {
        return new TGraph(g.subgraph(verts));
    }, {unwrapValues: true}));

    scope.addFunction(new jme.funcObj('subgraph',['graph','list of edge'], TGraph, function(g,edges) {
        return new TGraph(g.subgraph_by_edges(edges));
    }, {unwrapValues: true}));

    scope.addFunction(new jme.funcObj('cartesian_product',['graph','graph'],TGraph,function(a,b) {
        return Graph.cartesian_product(a,b);
    }));

    scope.addFunction(new jme.funcObj('direct_product',['graph','graph'], TGraph, function(a,b) {
        return Graph.direct_product(a,b);
    }));

    scope.addFunction(new jme.funcObj('permute_vertices',['list of number','graph'], TGraph, function(p,g) {
        return new TGraph(g.permute_vertices(p));
    },{unwrapValues:true}));

    scope.addFunction(new jme.funcObj('permute_vertices',['permutation','graph'], TGraph, function(p,g) {
        return g.permute_vertices(p.to);
    }));

    scope.addFunction(new jme.funcObj('is_isomorphism',['list of number','graph'], TBool, function(p,g) {
        return g.is_isomorphism(p);
    },{unwrapValues: true}));

    scope.addFunction(new jme.funcObj('is_isomorphism',['permutation','graph'], TBool, function(p,g) {
        return g.is_isomorphism(p.to);
    }));

    scope.addFunction(new jme.funcObj('is_tree',['graph'], TBool, function(g) {
        return g.is_tree();
    }));

    scope.addFunction(new jme.funcObj('kruskals_algorithm', ['graph'], TList, function(g) {
        return g.kruskals_algorithm().map(e => new TEdge(e));
    }));

    scope.addFunction(new jme.funcObj('kruskals_algorithm_working', ['graph'], THTML, function(g) {
        const {working} = g.annotated_kruskals_algorithm();
        return working.render();
    }));

    scope.addFunction(new jme.funcObj('prims_algorithm', ['graph'], TList, function(g) {
        return g.prims_algorithm().map(e => new TEdge(e));
    }));

    scope.addFunction(new jme.funcObj('prims_algorithm_working', ['graph'], THTML, function(g) {
        const {working} = g.annotated_prims_algorithm();
        return working.render();
    }));

    scope.addFunction(new jme.funcObj('random_planar_graph', ['number', '[number]', '[number]'], TGraph, random_planar_graph));

    scope.addFunction(new jme.funcObj('weight_matrix', ['graph'], TMatrix, function(g) {
        const weight_matrix = g.weight_matrix();
        const out = weight_matrix.map(row => row.map(c => c===null ? 0 : c));
        out.rows = weight_matrix.rows;
        out.columns = weight_matrix.columns;
        return out;
    }));

    scope.addFunction(new jme.funcObj('weight_table', ['graph'], THTML, function(g) {
        return g.weight_table();
    }));

    scope.addFunction(new jme.funcObj('graph_app', ['string'], THTML, function(scene) {
        const g = document.createElement('graph-app')
        g.setAttribute('baseurl', Numbas.getStandaloneFileURL('graph-theory',''));
        g.setAttribute('scene',scene);
        return g;
    }));

    function graph_app_set_scene(g,graph) {
        const scene = {
            points: graph.vertices.map(p => { return {x:p.x, y:p.y}; }),
            edges: graph.edges.map(e => { return [e.from, e.to]; })
        };
        g.set_scene(scene);
    }

    function graph_app_scene_to_graph(scene) {
        const g = new Graph([]);
        g.vertices = scene.points.map(p => { return new Vertex(p.x,p.y); });
        g.edges = scene.edges.map(e => { return new Edge(e.from,e.to); });
        return g;
    }

    scope.addFunction(new jme.funcObj('graph_app', [TGraph,'[string]'], THTML, function(graph,mode) {
        const g = document.createElement('graph-app')
        g.setAttribute('baseurl', Numbas.getStandaloneFileURL('graph-theory',''));
        mode = mode || 'play movethings';
        g.setAttribute('mode',mode);
        graph_app_set_scene(g,graph);
        return g;
    }));

    class GraphEditor {
        constructor(element, part, title, events, answer_changed, options) {
            this.part = part;
            this.title = title;
            this.events = events;
            this.answer_changed = answer_changed;
            this.options = options;

            this.setting_value = false;

            const g = this.app = document.createElement('graph-app');
            g.setAttribute('baseurl', Numbas.getStandaloneFileURL('graph-theory',''));
            g.setAttribute('mode',options.mode);
            g.addEventListener('statechanged', e => {
                if(this.setting_value) {
                    return;
                }
                this.setting_value = true;
                this.answer_changed({valid: true, value: graph_app_scene_to_graph(e.detail.scene)});
                this.setting_value = false;
            });
            graph_app_set_scene(g,options.graph);
            element.appendChild(g);
        }

        setAnswerJSON(answerJSON) {
            this.setting_value = true;
            this.setting_value = false;
        }
        
        disable() {
            this.app.setAttribute('disabled',true);
        }

        enable() {
            this.app.removeAttribute('disabled');
        }
    }

    Numbas.answer_widgets.register_custom_widget({
        name: 'graph-editor',
        niceName: 'Graph editor',
        widget: GraphEditor,
        signature: 'graph',
        answer_to_jme: function(answer) {
            return new TGraph(answer);
        },
        options_definition: [
            {
                name: 'graph',
                label: 'Initial graph',
                input_type: 'jme',
                default_value: ''
            },
            {
                name: 'mode',
                label: 'Mode',
                input_type: 'dropdown',
                data: {
                    choices: [
                        {value: 'edit movethings', label: 'Editing'},
                        {value: 'play movethings', label: 'Move vertices'},
                        {value: 'play hamilton', label: 'Make a Hamiltonian cycle'},
                        {value: 'play euler', label: 'Make an Eulerian cycle'}
                    ]
                },
                default_value: 'play movethings'
            }
        ],
        scorm_storage: {
            interaction_type: function(part) { return 'fill-in'; },
            correct_answer: function(part) { return part.input_options().correctAnswer; },
            student_answer: function(part) { return part.studentAnswer; },
            load: function(part, data) { return data.answer; }
        }
    });
});
