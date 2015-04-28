    function toggleToolsCategory(category, event) {
        if (category.hasAttribute("hidden")) {
            category.removeAttribute("hidden");
            event.currentTarget.style.cursor = "n-resize";
        }
        else {
            category.setAttribute("hidden", "hidden");
            event.currentTarget.style.cursor = "s-resize";
        }
    }

    function getPosition(element) {
        var xPosition = 0;
        var yPosition = 0;

        while (element) {
            xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }
        
        return {
            x: xPosition,
            y: yPosition
        };
    }

    var Connecting = false;
    var ConnectionSettings = {
        "StartPin": null,
        "EndPin": null
    };
    var ConnectionNum = 0;

    function CreateConnection(connection) {
        var start_pos = getPosition(document.getElementById(connection.dataset.StartPin));
        var end_pos = getPosition(document.getElementById(connection.dataset.EndPin));
        var width = Math.abs(end_pos.x - start_pos.x);
        var height = Math.abs(end_pos.y - start_pos.y);
        var top = Math.min(start_pos.y, end_pos.y);
        var left = Math.min(start_pos.x, end_pos.x);
        var inverse_v = top < start_pos.y ? 1 : 0;
        var inverse_h = left < start_pos.x ? 1 : 0;
        
        connection.setAttribute("height", height);
        connection.setAttribute("width", width);
        connection.style.width = width.toString() + "px";
        connection.style.height = height.toString() + "px";
        connection.style.position = "absolute";
        connection.style.top = top.toString() + "px";
        connection.style.left = left.toString() + "px";
        
        var ctx = connection.getContext("2d");
        ctx.clearRect(0, 0, width, height);
        ctx.moveTo(
            width * inverse_h,
            height * inverse_v
            );
        ctx.strokeStyle = "white";
        ctx.bezierCurveTo(
            width / 2,
            height * inverse_v,
            width / 2,
            height * (1 - inverse_v),
            width * (1 - inverse_h),
            height * (1 - inverse_v)
            );
        ctx.stroke();
    }

    function ConnectionClick(event) {
        if (event.target.getAttribute("class").indexOf("pin") > -1 && !event.currentTarget.hasAttribute("id")) {
            if (Connecting) {
                console.log("end connection");
                Connecting = false;
                
                var ConnectionNode = document.createElement("canvas");
                ConnectionNode.setAttribute("class", "main-graph-connection");
                ConnectionNode.id = "connection" + ConnectionNum.toString();
                event.currentTarget.id = "PinIn" + ConnectionNum.toString();
                ConnectionNum++;
                
                ConnectionSettings.EndPin = event.currentTarget;
                ConnectionNode.dataset.StartPin = ConnectionSettings.StartPin.id;
                ConnectionNode.dataset.EndPin = ConnectionSettings.EndPin.id;
                
                CreateConnection(ConnectionNode);
                
                var Graph = document.getElementById("main-graph");
                Graph.appendChild(ConnectionNode);
            }
            else {
                console.log("start connection");
                Connecting = true;
                
                event.currentTarget.id = "PinOut" + ConnectionNum.toString();
                ConnectionSettings.StartPin = event.currentTarget;
            }
        }
        else {
            console.log("connection error");
            event.PreventDefault();
        }
    }

    function nodeDragStart(event) {
        if (event.target.getAttribute("class") === "drag-handle") {
            var clone = event.currentTarget.cloneNode(true);
            clone.style.visibility = "hidden";
            clone.style.overflow = "hidden";
            clone.id = "clone-node";
            event.currentTarget.appendChild(clone);
            event.dataTransfer.setDragImage(clone, 0, 0);
            event.dataTransfer.setData("text/plain", "głupi firefox");
        }
        else {
            event.preventDefault();
        }
    }

    function nodeDrag(event) {
        event.preventDefault();
        this.style.top = (cursorPos.y - this.offsetHeight / 2).toString() + "px";
        this.style.left = (cursorPos.x - this.offsetWidth / 2).toString() + "px";
    }

    function nodeDragEnd(event) {
        event.preventDefault();
        var clone = document.getElementById("clone-node");
        event.currentTarget.removeChild(clone);
        var pins = event.currentTarget.getElementsByClassName("pin");
        for (var i = 0; i < pins.length; i++) {
            if (pins[i].hasAttribute("id")) {
                if (pins[i].id.indexOf("In") > -1) {
                    var connection_num = "connection" + pins[i].id.substr(5);
                    CreateConnection(document.getElementById(connection_num));
                }
                else if (pins[i].id.indexOf("Out") > -1) {
                    var connection_num = "connection" + pins[i].id.substr(6);
                    CreateConnection(document.getElementById(connection_num));
                }
            }
        }
    }

    function addToGraph(node) {
        var newNode = document.createElement("div");
        newNode.setAttribute("class", "main-graph-node");
        newNode.id = "node" + numberOfPlacedNodes;
        numberOfPlacedNodes++;
        newNode.innerHTML = node.innerHTML + "<br/>" + newNode.id + templates[node.dataset.template].join("\n");
        newNode.style.top = (25 * numberOfPlacedNodes).toString() + "px";
        newNode.style.left = (25 * numberOfPlacedNodes).toString() + "px";
        newNode.setAttribute("draggable", "true");
        newNode.addEventListener("dragstart", nodeDragStart, false);
        newNode.addEventListener('drag', nodeDrag);
        newNode.addEventListener("dragend", nodeDragEnd);
        var graph = document.getElementById("main-graph");
        graph.appendChild(newNode);
    }

    function clearGraph() {
        var graph = document.getElementById("main-graph");
        var nodes = graph.getElementsByClassName("main-graph-node");
        var nodesNum = nodes.length;
        if (nodesNum > 0) {
            for (var i = 0; i < nodesNum; i++) {
                nodes[0].removeEventListener("dragstart", nodeDragStart);
                nodes[0].removeEventListener("drag", nodeDrag);
                nodes[0].removeEventListener("dragend", nodeDragEnd);
                graph.removeChild(nodes[0]);
            }
        }
        numberOfPlacedNodes = 0;
    }

    function deleteNode(node) {
        var graph = document.getElementById("main-graph");
        var allnodes = graph.getElementsByClassName("main-graph-node");
        var nodesNum = allnodes.length;
        node.removeEventListener("dragstart", nodeDragStart);
        node.removeEventListener("drag", nodeDrag);
        node.removeEventListener("dragend", nodeDragEnd);
        var index = parseInt(node.id.substr(4));
        graph.removeChild(node);
        numberOfPlacedNodes--;
        if (numberOfPlacedNodes > 0 && index < nodesNum - 1) {
            for (var i = index; i < nodesNum - 1; i++)
                allnodes[i].id = "node" + i;
        }
    }


    var numberOfPlacedNodes = 0;
    var cursorPos = {
        x: 0,
        y: 0
    };

    var graph = document.getElementById("main-graph");
    graph.addEventListener('dragover', function(event) {
        event.preventDefault();
        cursorPos.x = event.clientX;
        cursorPos.y = event.clientY;
    });
    graph.addEventListener('drop', function(event) {
        event.preventDefault();
    });

    var nodes = document.getElementsByClassName("toolbox-tool");
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].addEventListener("click", function() {
            addToGraph(this);
        });
        nodes[i].addEventListener("mousemove", ToolDescription);
    }

    var ttct = document.getElementsByClassName("toolbox-tools-category-title");
    for (var i = 0; i < ttct.length; i++) {
        ttct[i].addEventListener("click", function(event) {
            toggleToolsCategory(this.nextElementSibling, event);
        });
    }

    function ToolDescription(event) {
        var opis = event.currentTarget.nextElementSibling;
        opis.style.top = event.clientY + "px";
        opis.style.left = (event.clientX - opis.offsetWidth - 20) + "px";
    }