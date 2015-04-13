function toggleToolsCategory(category) {
    if(category.hasAttribute("hidden")) {
        category.removeAttribute("hidden");
        event.currentTarget.style.cursor = "n-resize";
    } else {
        category.setAttribute("hidden", "hidden");
        event.currentTarget.style.cursor = "s-resize";
    }
}

function nodeDragStart(event) {
    var clone = event.target.cloneNode(true);
    clone.style.visibility = "hidden";
    clone.style.overflow = "hidden";
    clone.id ="clone-node";
    event.target.appendChild(clone);
    event.dataTransfer.setDragImage(clone,0,0);
    event.dataTransfer.setData("text/plain","głupi firefox");
}

function nodeDrag(event) {
    event.preventDefault();
    this.style.top = (cursorPos.y-this.offsetHeight/2).toString() + "px";
    this.style.left = (cursorPos.x-this.offsetWidth/2).toString() + "px";
    // this.innerHTML = this.id + "<br/>" + cursorPos.x + ", " + cursorPos.y;
}

function nodeDragEnd(event) {
   var clone = document.getElementById("clone-node");
   event.target.removeChild(clone);
}

function addToGraph(node) {
    var newNode = document.createElement("div");
    newNode.setAttribute("class", "main-graph-node");
    newNode.id = "node"+numberOfPlacedNodes;
    numberOfPlacedNodes++;
    newNode.innerHTML = node.innerHTML + "<br/>" + newNode.id + " <a href='#' onClick='deleteNode(this.parentElement)'>X</a>";
    newNode.style.top = (25*numberOfPlacedNodes).toString()+"px";
    newNode.style.left = (25*numberOfPlacedNodes).toString()+"px";
    newNode.setAttribute("draggable", "true");
    newNode.addEventListener("dragstart", nodeDragStart);
    newNode.addEventListener('drag', nodeDrag);
    newNode.addEventListener("dragend", nodeDragEnd);
    var graph = document.getElementById("main-graph");
    graph.appendChild(newNode);
}

function clearGraph() {
    var graph = document.getElementById("main-graph");
    var nodes = graph.getElementsByClassName("main-graph-node");
    var nodesNum = nodes.length;
    if(nodesNum > 0) {
        for(var i=0; i<nodesNum; i++) {
            nodes[0].removeEventListener("dragstart", nodeDragStart);
            nodes[0].removeEventListener("drag", nodeDrag);
            nodes[0].removeEventListener("dragend", nodeDragEnd);
            graph.removeChild(nodes[0]);
        }
    }
    numberOfPlacedNodes = 0;
}

function deleteNode(node){
     
    var graph = document.getElementById("main-graph");
    var allnodes = graph.getElementsByClassName("main-graph-node");
    var nodesNum = allnodes.length;
    node.removeEventListener("dragstart", nodeDragStart);
    node.removeEventListener("drag", nodeDrag);
    node.removeEventListener("dragend", nodeDragEnd);
    var index = parseInt(node.id.substr(4));
    graph.removeChild(node);
    numberOfPlacedNodes--;
    if(numberOfPlacedNodes>0&&index<nodesNum-1)
    {
        for(var i=index;i<nodesNum-1;i++)
        allnodes[i].id="node"+i;
       
    }
    
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
