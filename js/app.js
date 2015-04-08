function toggleToolsCategory(category) {
    if(category.hasAttribute("hidden")) {
        category.removeAttribute("hidden");
        event.currentTarget.style.cursor = "n-resize";
    } else {
        category.setAttribute("hidden", "hidden");
        event.currentTarget.style.cursor = "s-resize";
    }
}

function addToGraph(node) {
    var newNode = document.createElement("div");
    newNode.innerHTML = node.innerHTML;
    newNode.setAttribute("class", "main-graph-node");
    newNode.id = "node"+numberOfPlacedNodes;
    numberOfPlacedNodes++;
    newNode.style.top = (25*numberOfPlacedNodes).toString()+"px";
    newNode.style.left = (25*numberOfPlacedNodes).toString()+"px";
    newNode.setAttribute("draggable", "true");
    newNode.addEventListener("dragstart", function(event) {
        var clone = this.cloneNode(true);
        clone.style.visibility = "hidden";
        clone.style.overflow = "hidden";
        clone.id ="clone-node";
        this.appendChild(clone);
        event.dataTransfer.setDragImage(clone,0,0);
        event.dataTransfer.setData("text/plain","głupi firefox");
    });
    newNode.addEventListener('drag', function(event) {
        event.preventDefault();
        this.style.top = (cursorPos.y-this.offsetHeight/2).toString() + "px";
        this.style.left = (cursorPos.x-this.offsetWidth/2).toString() + "px";
        this.innerHTML = this.id + "<br/>" + cursorPos.x + ", " + cursorPos.y;
    });
    newNode.addEventListener("dragend", function(event) {
       var clone = this.getElementById("clone-node");
       this.removeChild(clone);
    });
    
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
var cursorPos = {
    x: 0,
    y: 0
};

var graph = document.getElementById("main-graph");
graph.addEventListener('dragover', function(event){
    event.preventDefault();
    cursorPos.x = event.clientX;
    cursorPos.y = event.clientY;
});
graph.addEventListener('drop', function(event) {
    event.preventDefault();
});

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
