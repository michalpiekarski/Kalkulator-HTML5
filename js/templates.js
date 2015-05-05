var inputPin = "<a href='#' class='pin input-pin' onClick='ConnectionClick(event)'></a>";
var outputPin = "<a href='#' class='pin output-pin' onClick='ConnectionClick(event)'></a>";
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

var functions = {
  "dodawanie" : function(args) {
    var result = 0;
    for(var i = 0; i < args.length; i++) {
      result += args[i];
    }
    return result;
  },
  "odejmowanie" : function(args) {
  },
  "mnozenie" : function(args) {
  },
  "dzielenie" : function(args) {
  },
  "negacja" : function(args) {
  },
  "potegowanie" : function(args) {
  },
  "pierwiastkowanie" : function(args) {
  },
  "logarytm" : function(args) {
  },
  "silnia" : function(args) {
  },
  "modulo" : function(args) {
  },
  "sinus" : function(args) {
  },
  "cosinus" : function(args) {
  },
  "tangens" : function(args) {
  },
  "cotangens" : function(args) {
  },
  "secans" : function(args) {
  },
  "cosecans" : function(args) {
  },
  "stala_pi" : function(args) {
  },
  "stala_epsilon" : function(args) {

  }
};
