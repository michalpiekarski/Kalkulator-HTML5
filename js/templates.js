var inputPin = "<div class='pin input-pin'></div>";
var outputPin = "<div class='pin output-pin'></div>";
var inputNumberXWithLabel = "<label>X<input type='number' /></label>";
var inputNumberYWithLabel = "<label>Y<input type='number' /></label>";
var closeButton = "<a href='#' onClick='deleteNode(this.parentElement)'>X</a>";
var moveHandle = "<a href='#' class='drag-handle'>MOVE</a>";
var  templates = {
    "dodawanie" : [
        closeButton,
        inputPin,
        inputNumberXWithLabel,
        inputPin,
        inputNumberYWithLabel,
        outputPin,
        moveHandle
        ],
    "odejmowanie" : [
        closeButton,
        inputPin,
        inputNumberXWithLabel,
        inputPin,
        inputNumberYWithLabel,
        outputPin,
        moveHandle
        ],
    "mnozenie" : [
        closeButton,
        inputPin,
        inputNumberXWithLabel,
        inputPin,
        inputNumberYWithLabel,
        outputPin,
        moveHandle
        ],
    "dzielenie" : [
        closeButton,
        inputPin,
        inputNumberXWithLabel,
        inputPin,
        inputNumberYWithLabel,
        outputPin,
        moveHandle
        ],
    "negacja" : [
        closeButton,
        inputPin,
        inputNumberXWithLabel,
        outputPin,
        moveHandle
        ],
    "potegowanie" : [
        closeButton,
        inputPin,
        inputNumberXWithLabel,
        inputPin,
        inputNumberYWithLabel,
        outputPin,
        moveHandle
        ],
    "pierwiastkowanie" : [
        closeButton,
        inputPin,
        inputNumberXWithLabel,
        inputPin,
        inputNumberYWithLabel,
        outputPin,
        moveHandle
        ],
    "logarytm" : [
        closeButton,
        inputPin,
        inputNumberXWithLabel,
        inputPin,
        inputNumberYWithLabel,
        outputPin,
        moveHandle
        ],
    "silnia" : [
        closeButton,
        inputPin,
        inputNumberXWithLabel,
        outputPin,
        moveHandle
        ],
    "modulo" : [
        closeButton,
        inputPin,
        inputNumberXWithLabel,
        inputPin,
        inputNumberYWithLabel,
        outputPin,
        moveHandle
        ],
    "sinus" : [
        closeButton,
        inputPin,
        inputNumberXWithLabel,
        outputPin,
        moveHandle
        ],
    "cosinus" : [
        closeButton,
        inputPin,
        inputNumberXWithLabel,
        outputPin,
        moveHandle
        ],
    "tangens" : [
        closeButton,
        inputPin,
        inputNumberXWithLabel,
        outputPin,
        moveHandle
        ],
    "cotangens" : [
        closeButton,
        inputPin,
        inputNumberXWithLabel,
        outputPin,
        moveHandle
        ],
    "secans" : [
        closeButton,
        inputPin,
        inputNumberXWithLabel,
        outputPin,
        moveHandle
        ],
    "cosecans" : [
        closeButton,
        inputPin,
        inputNumberXWithLabel,
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
