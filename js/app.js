function toggleToolsCategory(category) {
    if(category.hasAttribute("hidden")) {
        category.removeAttribute("hidden");
        event.currentTarget.style.cursor = "n-resize";
    } else {
        category.setAttribute("hidden");
        event.currentTarget.style.cursor = "s-resize";
    }
}

function addToGraph(node) {
    var newNode = document.createElement("div");
    newNode.innerHTML = node.innerHTML;
    newNode.setAttribute("class", "main-graph-node");
    newNode.setAttribute("draggable", "true");
    numberOfPlacedNodes++;
    newNode.style.top = (25*numberOfPlacedNodes).toString()+"px";
    newNode.style.left = (25*numberOfPlacedNodes).toString()+"px";
    var graph = document.getElementById("main-graph");
    graph.appendChild(newNode);
}

function clearGraph() {
    var graph = document.getElementById("main-graph");
    var nodes = graph.getElementsByClassName("main-graph-node");
    var nodesNum = nodes.length;
    if(nodesNum > 0) {
        for(var i=0; i<nodesNum; i++) {
            graph.removeChild(nodes[0]);
        }
    }
    numberOfPlacedNodes = 0;
}

var numberOfPlacedNodes = 0;

var nodes = document.getElementsByClassName("toolbox-tool");
for(var i=0; i<nodes.length; i++) {
    nodes[i].addEventListener("click", function() {
        addToGraph(this);
    });
}

var ttct = document.getElementsByClassName("toolbox-tools-category-title");
for(var i=0; i<ttct.length; i++) {
    ttct[i].addEventListener("click", function() {
        toggleToolsCategory(this.nextElementSibling);
    });
}
