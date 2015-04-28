var inputPin = "<div class='pin input-pin'></div>";
var outputPin = "<div class='pin output-pin'></div>";
var inputNumberXWithLabel = "<label>X<input type='number' /></label>";
var inputNumberYWithLabel = "<label>Y<input type='number' /></label>";
var closeButton = "<a href='#' class='close-button' onClick='deleteNode(this.parentElement)'>X</a>";
var moveHandle = "<a href='#' class='drag-handle'>MOVE</a>";
var createContainer = function(elements) {
    var result = "<div class='node-container'>";
    result += elements.join("\n");
    result += "</div>";
    return result;
}
var  templates = {
    "dodawanie" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        createContainer([inputPin, inputNumberYWithLabel]),
        outputPin,
        moveHandle
        ],
    "odejmowanie" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        createContainer([inputPin, inputNumberYWithLabel]),
        outputPin,
        moveHandle
        ],
    "mnozenie" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        createContainer([inputPin, inputNumberYWithLabel]),
        outputPin,
        moveHandle
        ],
    "dzielenie" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        createContainer([inputPin, inputNumberYWithLabel]),
        outputPin,
        moveHandle
        ],
    "negacja" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        outputPin,
        moveHandle
        ],
    "potegowanie" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        createContainer([inputPin, inputNumberYWithLabel]),
        outputPin,
        moveHandle
        ],
    "pierwiastkowanie" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        createContainer([inputPin, inputNumberYWithLabel]),
        outputPin,
        moveHandle
        ],
    "logarytm" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        createContainer([inputPin, inputNumberYWithLabel]),
        outputPin,
        moveHandle
        ],
    "silnia" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        outputPin,
        moveHandle
        ],
    "modulo" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        createContainer([inputPin, inputNumberYWithLabel]),
        outputPin,
        moveHandle
        ],
    "sinus" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        outputPin,
        moveHandle
        ],
    "cosinus" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        outputPin,
        moveHandle
        ],
    "tangens" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        outputPin,
        moveHandle
        ],
    "cotangens" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        outputPin,
        moveHandle
        ],
    "secans" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        outputPin,
        moveHandle
        ],
    "cosecans" : [
        closeButton,
        createContainer([inputPin, inputNumberXWithLabel]),
        outputPin,
        moveHandle
        ],
    "stala_pi" : [
        closeButton,
        outputPin,
        moveHandle
        ],
    "stala_epsilon" : [
        closeButton,
        outputPin,
        moveHandle
        ]
};
