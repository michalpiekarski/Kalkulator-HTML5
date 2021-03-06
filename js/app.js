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
            xPosition += (element.offsetLeft + element.clientLeft);
            yPosition += (element.offsetTop + element.clientTop);
            element = element.offsetParent;
        }

        return {
            x: xPosition,
            y: yPosition
        };
    }

    var Connecting = false;
    var ConnectionSettings = {
        "startPin": null,
        "endPin": null
    };
    var ConnectionNum = 0;
    var PinNum = 0;

    function CreateConnection(connection) {
        var start_pos = getPosition(document.getElementById(connection.dataset.startPin));
        var end_pos = getPosition(document.getElementById(connection.dataset.endPin));
        var width = Math.max(1,Math.abs(end_pos.x - start_pos.x));
        var height = Math.max(1,Math.abs(end_pos.y - start_pos.y));
        var top = Math.min(start_pos.y, end_pos.y) + 5;
        var left = Math.min(start_pos.x, end_pos.x) + 5;
        var inverse_v = top < start_pos.y ? 1 : 0;
        var inverse_h = left < start_pos.x ? 1 : 0;

        connection.setAttribute("height", height);
        connection.setAttribute("width", width);
        connection.style.width = width.toString() + "px";
        connection.style.height = height.toString() + "px";
        connection.style.position = "absolute";
        connection.style.top = top.toString() + "px";
        connection.style.left = left.toString() + "px";
        connection.style.zIndex = "10";

        var ctx = connection.getContext("2d");
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2.5;
        ctx.moveTo(
            width * inverse_h,
            height * inverse_v + (ctx.lineWidth * (inverse_h===1?-1:1))
        );
        ctx.bezierCurveTo(
            width / 2,
            height * inverse_v,
            width / 2,
            height * (1 - inverse_v),
            width * (1 - inverse_h),
            height * (1 - inverse_v) - (ctx.lineWidth * (inverse_h===1?-1:1))
        );
        ctx.stroke();
    }

    function ConnectionClick(event) {
        event.preventDefault();
        if(checkIfIsPin(event.currentTarget)) {
          if (checkIfPinNotConnected(event.currentTarget)) {
              if (Connecting && checkMatchingPinTypes(event.currentTarget, ConnectionSettings.startPin) && checkPinParents(event.currentTarget, ConnectionSettings.startPin)) {
                  endConnection(event.currentTarget, false);
              } else if (!Connecting) {
                  startConnection(event.currentTarget, false);
              }
          } else if (event.currentTarget.getAttribute('class').indexOf('output') > -1) {
            if (Connecting) {
              endConnection(event.currentTarget, true);
            } else {
              startConnection(event.currentTarget, true);
            }
          }
        }
    }

    function startConnection(pin, keepID) {
      console.log("start connection");
      Connecting = true;

      if(!keepID) {
        pin.id = "Pin" + PinNum.toString();
        PinNum++;
      }
      ConnectionSettings.startPin = pin;
    }

    function endConnection(pin, keepID) {
      console.log("end connection");
      Connecting = false;

      var ConnectionNode = document.createElement("canvas");
      ConnectionNode.setAttribute("class", "main-graph-connection");
      ConnectionNode.id = "connection" + ConnectionNum.toString();
      if(!keepID) {
        pin.id = "Pin" + PinNum.toString();
        PinNum++;
      }
      ConnectionNum++;

      ConnectionSettings.endPin = pin;
      ConnectionNode.dataset.startPin = ConnectionSettings.startPin.id;
      ConnectionNode.dataset.endPin = ConnectionSettings.endPin.id;

      var sp = document.getElementById(ConnectionSettings.startPin.id);
      console.log(sp.dataset.connection);
      if(sp.dataset.connection === undefined) {
        sp.dataset.connection = ConnectionNode.id;
      } else {
        sp.dataset.connection += "&" + ConnectionNode.id;
      }
      var ep = document.getElementById(ConnectionSettings.endPin.id);
      if(ep.dataset.connection === undefined) {
        ep.dataset.connection = ConnectionNode.id;
      } else {
        ep.dataset.connection += "&" + ConnectionNode.id;
      }

      CreateConnection(ConnectionNode);

      var Graph = document.getElementById("main-graph");
      Graph.appendChild(ConnectionNode);

      ConnectionSettings = {
          "startPin": null,
          "endPin": null
      };
    }

    function checkIfIsPin(pin) {
      if(pin.getAttribute("class").indexOf("pin") > -1) {
        return true;
      } else {
        console.error("Target is not a pin");
        return false;
      }
    }

    function checkIfPinNotConnected(pin) {
      if(!pin.hasAttribute("id")) {
        return true;
      } else {
        console.error("Pin already connected");
        return false;
      }
    }

    function checkMatchingPinTypes(pin1, pin2) {
      var pin1Class = pin1.getAttribute('class');
      var pin2Class = pin2.getAttribute('class');
      if((pin1Class.indexOf('input') > -1 && pin2Class.indexOf("output") > -1) || (pin1Class.indexOf('output') > -1 && pin2Class.indexOf("input") > -1)) {
        return true;
      } else {
        console.error("Pins are not of matching types");
        return false;
      }
    }

    function checkPinParents(pin1, pin2) {
      var pin1Class = pin1.getAttribute('class');
      if((pin1Class.indexOf('input') > -1 && pin1.parentElement.parentElement !== pin2.parentElement) || (pin1Class.indexOf('output') > -1 && pin1.parentElement !== pin2.parentElement.parentElement)) {
        return true;
      } else {
        console.error("Pins are from the same node");
        return false;
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
        event.currentTarget.style.top = (cursorPos.y - event.currentTarget.offsetHeight / 2).toString() + "px";
        event.currentTarget.style.left = (cursorPos.x - event.currentTarget.offsetWidth / 2).toString() + "px";
    }

    function nodeDragEnd(event) {
        event.preventDefault();
        var clone = document.getElementById("clone-node");
        event.currentTarget.removeChild(clone);
        var pins = event.currentTarget.getElementsByClassName("pin");
        for (var i = 0; i < pins.length; i++) {
            if (pins[i].hasAttribute("id")) {
                var pinConnections = pins[i].dataset.connection.split("&");
                for(var j = 0; j < pinConnections.length; j++) {
                  CreateConnection(document.getElementById(pinConnections[j]));
                }
            }
        }
    }

    function addToGraph(node) {
        var graph = document.getElementById("main-graph");
        var newNode = document.createElement("div");
        newNode.setAttribute("class", "main-graph-node");
        newNode.id = "node" + numberOfPlacedNodes;
        newNode.dataset.template = node.dataset.template;
        numberOfPlacedNodes++;
        newNode.innerHTML = node.innerHTML + "<br><span class='nodeName'><br/></span>" + templates[node.dataset.template].join("\n");
        newNode.style.top = (25 * numberOfPlacedNodes + graph.scrollTop).toString() + "px";
        newNode.style.left = (25 * numberOfPlacedNodes + graph.scrollLeft).toString() + "px";
        newNode.setAttribute("draggable", "true");
        newNode.addEventListener("dragstart", nodeDragStart, false);
        newNode.addEventListener('drag', nodeDrag);
        newNode.addEventListener("dragend", nodeDragEnd);
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
            numberOfPlacedNodes = 0;
        }
        PinNum = 0;
        var rnp = document.getElementById("result-node").getElementsByClassName("input-pin")[0];
        rnp.removeAttribute("id");
        rnp.removeAttribute('data-connection');
        var connections = graph.getElementsByClassName('main-graph-connection');
        var connectionsNum = connections.length;
        if(connectionsNum > 0) {
            for(var i = 0; i < connectionsNum; i++) {
                graph.removeChild(connections[0]);
            }
            ConnectionNum = 0;
        }
    }

    function deleteNode(node) {
        var graph = document.getElementById("main-graph");
        var allnodes = graph.getElementsByClassName("main-graph-node");
        var nodesNum = allnodes.length;
        node.removeEventListener("dragstart", nodeDragStart);
        node.removeEventListener("drag", nodeDrag);
        node.removeEventListener("dragend", nodeDragEnd);
        deleteNodeConnections(node);
        var index = parseInt(node.id.substr(4));
        graph.removeChild(node);
        numberOfPlacedNodes--;
        if (numberOfPlacedNodes > 0 && index < nodesNum - 1) {
            for (var i = index; i < nodesNum - 1; i++)
                allnodes[i].id = "node" + i;
        }
        fixConnectedPins();
    }

    function deleteNodeConnections(node) {
      var pins = node.getElementsByClassName('pin');
      var pinsNum = pins.length;
      if(pinsNum > 0) {
        for(var i = 0; i < pinsNum; i++) {
          if(pins[i].hasAttribute('id')) {
            PinNum--;
            var pinConnections = pins[i].dataset.connection.split('&');
            for(var j = 0; j < pinConnections.length; j++) {
              var pinConnection = document.getElementById(pinConnections[j]);
              var otherPin;
              if(pins[i].id === pinConnection.dataset.startPin) {
                otherPin = document.getElementById(pinConnection.dataset.endPin);
              } else if (pins[i].id === pinConnection.dataset.endPin) {
                otherPin = document.getElementById(pinConnection.dataset.startPin);
              }
              if(otherPin.dataset.connection === pinConnection.id) {
                otherPin.removeAttribute('data-connection');
                otherPin.removeAttribute('id');
                PinNum--;
              } else {
                var pcs = otherPin.dataset.connection.split('&');
                var pcsresult = [];
                for (var k = 0; k < pcs.length; k++) {
                  if(pcs[k] !== pinConnection.id) {
                    pcsresult.push(pcs[k]);
                  }
                }
                otherPin.dataset.connection = pcsresult.join('&');
              }
              graph.removeChild(pinConnection);
              ConnectionNum--;
            }
          }
        }
      }
    }

    function fixConnectedPins() {
      var graph = document.getElementById("main-graph");
      var cpins = graph.getElementsByClassName('output-pin');
      var cpinsNum = cpins.length;
      if(cpinsNum > 0) {
        var pnum = 0;
        for(var i = 0; i < cpinsNum; i++) {
          if(cpins[i].hasAttribute("id")) {
            var pinConnections = cpins[i].dataset.connection.split('&');
            var pinConnectionsNum = pinConnections.length;
            if(pinConnectionsNum > 0) {
              for(var j = 0; j < pinConnectionsNum; j++) {
                if(pinConnections[j].dataset.startPin === cpins[i].id) {
                  cpins[i].id = "Pin" + pnum.toString();
                  pnum++;
                  pinConnections[j].dataset.startPin = cpins[i].id;
                  var otherPin = document.getElementById(pinConnections[j].dataset.endPin);
                  otherPin.id = "Pin" + pnum.toString();
                  pnum++;
                  pinConnections[j].dataset.endPin = otherPin.id;
                } else {
                  cpins[i].id = "Pin" + pnum.toString();
                  pnum++;
                  pinConnections[j].dataset.endPin = cpins[i].id;
                  var otherPin = document.getElementById(pinConnections[j].dataset.startPin);
                  otherPin.id = "Pin" + pnum.toString();
                  pnum++;
                  pinConnections[j].dataset.startPin = otherPin.id;
                }
              }
            }
          }
        }
        PinNum = pnum;
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
        cursorPos.x = event.clientX + event.currentTarget.scrollLeft;
        cursorPos.y = event.clientY + event.currentTarget.scrollTop;
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

    function changeGraphExtend() {
        var xEx = document.getElementById('graphXExtend');
        var yEx = document.getElementById('graphYExtend');

        var eog = document.getElementById("end-of-graph");
        eog.style.right = (-xEx.value).toString() + "px";
        eog.style.bottom = (-yEx.value).toString() + "px";
    }

    function CalculateEquation() {
      var firstNode = document.getElementById('result-node');
      var firstPin = firstNode.getElementsByClassName('input-pin')[0];
      var connectedPin = getConnectedPin(firstPin);
      alert("WYNIK TO: " + CalculateNode(connectedPin));
    }

    function getConnectedPin(pin) {
      console.info(pin);
      var node = pin.dataset.connection;
      if(node === undefined) {
        var returnValue = pin.nextElementSibling;
        returnValue = returnValue.getElementsByTagName('input')[0];
        return parseFloat(returnValue.value);
      }
      node = document.getElementById(node);
      if(pin.id === node.dataset.startPin) {
        node = node.dataset.endPin;
      } else {
        node = node.dataset.startPin;
      }
      node = document.getElementById(node);
      return node.parentElement;
    }

    function CalculateNode(node) {
      var funkcja = functions[node.dataset.template];
      var args = [];
      var inputPins = node.getElementsByClassName('input-pin');
      var inputPinsNum = inputPins.length;
      if(inputPinsNum > 0) {
        for(var i = 0; i < inputPinsNum; i++) {
          var arg = getConnectedPin(inputPins[i]);
          if(isNaN(arg)) {
            args.push(CalculateNode(arg));
          } else {
            args.push(arg);
          }
        }
      }
      return funkcja(args);
    }
